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
  };
}

export async function getGithubContributions(
  username: string = "IlyasKasep",
): Promise<ContributionData> {
  // Strategy 1: Official GitHub GraphQL API if GITHUB_TOKEN is available
  const token = process.env.GITHUB_TOKEN;
  if (token) {
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
        next: { revalidate: 3600 },
      });

      if (response.ok) {
        const json = await response.json();
        const weeks =
          json?.data?.user?.contributionsCollection?.contributionCalendar?.weeks;
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
            return processRawContributions(rawItems);
          }
        }
      }
    } catch {
      // Fallback to Strategy 2
    }
  }

  // Strategy 2: Public GitHub Contributions API (no token required)
  try {
    const response = await fetch(
      `https://github-contributions-api.jogruber.de/v4/${encodeURIComponent(username)}?y=last`,
      {
        headers: {
          Accept: "application/json",
          "User-Agent": "portfolio-github-contributions",
        },
        next: { revalidate: 3600 },
      },
    );

    if (response.ok) {
      const json = await response.json();
      if (Array.isArray(json?.contributions) && json.contributions.length > 0) {
        return processRawContributions(json.contributions);
      }
    }
  } catch {
    // Fallback to deterministic data
  }

  // Strategy 3: Deterministic fallback
  return generateFallbackContributions();
}
