export interface DayData {
  date: string;
  count: number;
  level: number;
  dayOfWeek: number;
  weekIndex: number;
  monthName: string;
}

export interface ContributionData {
  days: DayData[];
  total: number;
  longestStreak: number;
  currentStreak: number;
  activeDaysPercent: number;
  isFallback?: boolean;
}

const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

function formatDate(date: Date): string {
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  });
}

// Fallback generator in case external APIs are completely unreachable
export function generateFallbackContributions(): ContributionData {
  const days: DayData[] = [];
  const today = new Date();
  const startDate = new Date(today);
  startDate.setDate(today.getDate() - 364 - today.getDay());

  let total = 0;
  let currentStreak = 0;
  let longestStreak = 0;
  let activeDays = 0;
  let tempStreak = 0;

  let seed = 42;
  const random = () => {
    const x = Math.sin(seed++) * 10000;
    return x - Math.floor(x);
  };

  for (let w = 0; w < 53; w++) {
    for (let d = 0; d < 7; d++) {
      const currentDate = new Date(startDate);
      currentDate.setDate(startDate.getDate() + w * 7 + d);
      if (currentDate > today) break;

      const dayOfWeek = currentDate.getDay();
      const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
      let prob = isWeekend ? 0.25 : 0.75;
      const month = currentDate.getMonth();
      if (month === 9 || month === 10) prob += 0.15;
      if (month === 11 && currentDate.getDate() > 20) prob -= 0.5;

      let count = 0;
      let level = 0;

      if (random() < prob) {
        const randVal = random();
        if (randVal < 0.5) {
          count = Math.floor(random() * 3) + 1;
          level = 1;
        } else if (randVal < 0.8) {
          count = Math.floor(random() * 3) + 4;
          level = 2;
        } else if (randVal < 0.95) {
          count = Math.floor(random() * 4) + 7;
          level = 3;
        } else {
          count = Math.floor(random() * 5) + 11;
          level = 4;
        }
      }

      total += count;
      if (count > 0) {
        activeDays++;
        tempStreak++;
        if (tempStreak > longestStreak) longestStreak = tempStreak;
      } else {
        tempStreak = 0;
      }

      days.push({
        date: formatDate(currentDate),
        count,
        level,
        dayOfWeek,
        weekIndex: w,
        monthName: MONTHS[month],
      });
    }
  }

  let tempCurrent = 0;
  for (let i = days.length - 1; i >= 0; i--) {
    if (days[i].count > 0) {
      tempCurrent++;
    } else if (i < days.length - 2) {
      break;
    }
  }
  currentStreak = tempCurrent;

  return {
    days,
    total,
    longestStreak,
    currentStreak,
    activeDaysPercent: Math.round((activeDays / days.length) * 100),
    isFallback: true,
  };
}

interface RawContributionItem {
  date: string;
  count: number;
  level: number;
}

function processRawContributions(rawItems: RawContributionItem[]): ContributionData {
  if (!rawItems || rawItems.length === 0) {
    return generateFallbackContributions();
  }

  // Ensure chronological sorting
  rawItems.sort((a, b) => a.date.localeCompare(b.date));

  let total = 0;
  let activeDays = 0;
  let longestStreak = 0;
  let tempStreak = 0;

  const days: DayData[] = [];
  let currentWeekIndex = 0;

  for (let i = 0; i < rawItems.length; i++) {
    const item = rawItems[i];
    const [year, month, day] = item.date.split("-").map(Number);
    const dateObj = new Date(Date.UTC(year, month - 1, day));
    const dayOfWeek = dateObj.getUTCDay();

    // Whenever we hit Sunday and it's not the first item, advance the week index
    if (dayOfWeek === 0 && i > 0) {
      currentWeekIndex++;
    }

    const count = Number(item.count) || 0;
    const level = Math.min(Math.max(Number(item.level) || 0, 0), 4);

    total += count;
    if (count > 0) {
      activeDays++;
      tempStreak++;
      if (tempStreak > longestStreak) longestStreak = tempStreak;
    } else {
      tempStreak = 0;
    }

    days.push({
      date: formatDate(dateObj),
      count,
      level,
      dayOfWeek,
      weekIndex: currentWeekIndex,
      monthName: MONTHS[dateObj.getUTCMonth()],
    });
  }

  // Calculate current streak from the tail
  let currentStreak = 0;
  let tempCurrent = 0;
  for (let i = days.length - 1; i >= 0; i--) {
    if (days[i].count > 0) {
      tempCurrent++;
    } else if (i < days.length - 2) {
      break;
    }
  }
  currentStreak = tempCurrent;

  return {
    days,
    total,
    longestStreak,
    currentStreak,
    activeDaysPercent: Math.round((activeDays / days.length) * 100),
    isFallback: false,
  };
}

async function fetchFromGraphQL(username: string, token: string): Promise<RawContributionItem[] | null> {
  try {
    const response = await fetch("https://api.github.com/graphql", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        "User-Agent": "portfolio-github-contributions",
      },
      body: JSON.stringify({
        query: `query($username: String!) {
          user(login: $username) {
            contributionsCollection {
              contributionCalendar {
                totalContributions
                weeks {
                  contributionDays {
                    contributionCount
                    date
                    contributionLevel
                    weekday
                  }
                }
              }
            }
          }
        }`,
        variables: { username },
      }),
      signal: AbortSignal.timeout(6000),
      next: { revalidate: 3600 },
    });

    if (response.ok) {
      const json = await response.json();
      const weeks = json?.data?.user?.contributionsCollection?.contributionCalendar?.weeks;
      if (Array.isArray(weeks)) {
        const rawItems: RawContributionItem[] = [];
        const levelMap: Record<string, number> = {
          NONE: 0,
          FIRST_QUARTILE: 1,
          SECOND_QUARTILE: 2,
          THIRD_QUARTILE: 3,
          FOURTH_QUARTILE: 4,
        };

        for (const week of weeks) {
          for (const day of week.contributionDays) {
            rawItems.push({
              date: day.date,
              count: day.contributionCount,
              level: levelMap[day.contributionLevel] ?? (day.contributionCount > 0 ? 1 : 0),
            });
          }
        }

        if (rawItems.length > 0) {
          return rawItems;
        }
      }
    }
  } catch (error) {
    console.warn("GitHub GraphQL fetch failed:", error);
  }
  return null;
}

async function fetchFromGithubHtml(username: string): Promise<RawContributionItem[] | null> {
  try {
    const response = await fetch(
      `https://github.com/users/${encodeURIComponent(username)}/contributions`,
      {
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
          Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
        },
        signal: AbortSignal.timeout(6000),
        next: { revalidate: 3600 },
      },
    );

    if (!response.ok) {
      return null;
    }

    const html = await response.text();

    // Extract tooltips to get exact count per element ID
    const tooltipMap = new Map<string, number>();
    const tooltipRegex = /<tool-tip[^>]*for="([^"]+)"[^>]*>([^<]+)<\/tool-tip>/gi;
    let tMatch: RegExpExecArray | null;
    while ((tMatch = tooltipRegex.exec(html)) !== null) {
      const id = tMatch[1];
      const text = tMatch[2];
      const countMatch = text.match(/(\d+)\s+contribution/i);
      const count = countMatch ? parseInt(countMatch[1], 10) : 0;
      tooltipMap.set(id, count);
    }

    // Extract table cells
    const tdRegex = /<td\s+[^>]*data-date="(\d{4}-\d{2}-\d{2})"[^>]*>/gi;
    const rawItems: RawContributionItem[] = [];
    let dMatch: RegExpExecArray | null;
    while ((dMatch = tdRegex.exec(html)) !== null) {
      const fullTag = dMatch[0];
      const dateMatch = fullTag.match(/data-date="(\d{4}-\d{2}-\d{2})"/);
      const idMatch = fullTag.match(/id="([^"]+)"/);
      const levelMatch = fullTag.match(/data-level="(\d+)"/);

      if (dateMatch) {
        const date = dateMatch[1];
        const id = idMatch ? idMatch[1] : "";
        const level = levelMatch ? Math.min(Math.max(parseInt(levelMatch[1], 10), 0), 4) : 0;
        const count = id && tooltipMap.has(id) ? tooltipMap.get(id)! : (level > 0 ? 1 : 0);
        rawItems.push({ date, count, level });
      }
    }

    if (rawItems.length >= 350) {
      return rawItems;
    }
  } catch (error) {
    console.warn("Direct GitHub HTML fetch failed:", error);
  }
  return null;
}

async function fetchFromJogruber(username: string): Promise<RawContributionItem[] | null> {
  try {
    const response = await fetch(
      `https://github-contributions-api.jogruber.de/v4/${encodeURIComponent(username)}?y=last`,
      {
        headers: {
          Accept: "application/json",
          "User-Agent": "portfolio-github-contributions",
        },
        signal: AbortSignal.timeout(8000),
        next: { revalidate: 3600 },
      },
    );

    if (response.ok) {
      const json = await response.json();
      if (Array.isArray(json?.contributions) && json.contributions.length > 0) {
        return json.contributions;
      }
    }
  } catch (error) {
    console.warn("Jogruber API fetch failed:", error);
  }
  return null;
}

export async function getGithubContributions(
  username: string = "IlyasKasep",
): Promise<ContributionData> {
  // Strategy 1: Official GitHub GraphQL API if GITHUB_TOKEN is available
  const token = process.env.GITHUB_TOKEN;
  if (token) {
    const items = await fetchFromGraphQL(username, token);
    if (items) {
      return processRawContributions(items);
    }
  }

  // Strategy 2: Direct Official GitHub public contributions page (super fast ~500ms, accurate, no token required)
  const htmlItems = await fetchFromGithubHtml(username);
  if (htmlItems) {
    return processRawContributions(htmlItems);
  }

  // Strategy 3: Public Jogruber API (proxy, 8s timeout)
  const jogruberItems = await fetchFromJogruber(username);
  if (jogruberItems) {
    return processRawContributions(jogruberItems);
  }

  // Strategy 4: Fallback only if all networks fail
  return generateFallbackContributions();
}
