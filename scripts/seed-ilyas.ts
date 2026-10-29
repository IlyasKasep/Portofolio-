import { ProjectCategory, SkillCategory, ContentStatus } from '../src/generated/prisma/enums';
import { PrismaClient } from '../src/generated/prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';
import { config } from 'dotenv';

config({ path: '.env.local', quiet: true });
config({ path: '.env', quiet: true });

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('Clearing existing data...');
  await prisma.projectSkill.deleteMany();
  await prisma.projectHighlight.deleteMany();
  await prisma.projectContribution.deleteMany();
  await prisma.projectImpact.deleteMany();
  await prisma.projectImpactStat.deleteMany();
  await prisma.projectMedia.deleteMany();
  await prisma.project.deleteMany();
  
  await prisma.experienceHighlight.deleteMany();
  await prisma.experience.deleteMany();
  await prisma.skill.deleteMany();

  console.log('Inserting skills...');
  const skills = [
    { name: 'HTML', category: SkillCategory.FRONTEND, slug: 'html', showOnHome: true, sortOrder: 1 },
    { name: 'CSS', category: SkillCategory.FRONTEND, slug: 'css', showOnHome: true, sortOrder: 2 },
    { name: 'JavaScript', category: SkillCategory.FRONTEND, slug: 'javascript', showOnHome: true, sortOrder: 3 },
    { name: 'React.js', category: SkillCategory.FRONTEND, slug: 'reactjs', showOnHome: true, sortOrder: 4 },
    { name: 'Next.js', category: SkillCategory.FRONTEND, slug: 'nextjs', showOnHome: true, sortOrder: 5 },
    { name: 'Redux', category: SkillCategory.FRONTEND, slug: 'redux', showOnHome: true, sortOrder: 6 },
    { name: 'Tailwind CSS', category: SkillCategory.FRONTEND, slug: 'tailwindcss', showOnHome: true, sortOrder: 7 },
    { name: 'Bootstrap', category: SkillCategory.FRONTEND, slug: 'bootstrap', showOnHome: true, sortOrder: 8 },
    { name: 'CodeIgniter 4', category: SkillCategory.BACKEND, slug: 'codeigniter-4', showOnHome: true, sortOrder: 9 },
    { name: 'PHP', category: SkillCategory.BACKEND, slug: 'php', showOnHome: true, sortOrder: 10 },
    { name: 'Firebase', category: SkillCategory.DATABASE, slug: 'firebase', showOnHome: true, sortOrder: 11 },
    { name: 'MySQL', category: SkillCategory.DATABASE, slug: 'mysql', showOnHome: true, sortOrder: 12 },
    { name: 'Figma', category: SkillCategory.TOOLS, slug: 'figma', showOnHome: true, sortOrder: 13 },
    { name: 'Git', category: SkillCategory.TOOLS, slug: 'git', showOnHome: true, sortOrder: 14 },
    { name: 'Github', category: SkillCategory.TOOLS, slug: 'github', showOnHome: true, sortOrder: 15 },
  ];

  const skillRecords = await Promise.all(
    skills.map(s => prisma.skill.create({ data: { ...s, status: ContentStatus.ACTIVE } }))
  );
  
  const getSkillId = (name: string) => {
    const skill = skillRecords.find(s => s.name === name);
    if (!skill) throw new Error(`Skill ${name} not found`);
    return skill.id;
  };

  console.log('Inserting experiences...');
  await prisma.experience.create({
    data: {
      slug: 'tenumba-sinergi-informatika',
      company: 'PT Tenumba Sinergi Informatika',
      role: 'Frontend Developer',
      type: 'Full-time',
      summary: 'Frontend Developer responsible for translating Figma designs into responsive Next.js applications.',
      startDate: new Date('2023-08-01'),
      isCurrent: true,
      durationLabel: 'Aug 2023 - Present',
      monogram: 'TSI',
      sortOrder: 1,
      highlights: {
        create: [
          { text: 'Collaborate closely with UI/UX designers to translate Figma design into highly responsive and interactive web applications.', position: 1 },
          { text: 'Utilize Next.js and Tailwind CSS for rapid prototyping and production-ready components.', position: 2 },
          { text: 'Ensure cross-browser compatibility and maintain web accessibility standards.', position: 3 }
        ]
      }
    }
  });

  await prisma.experience.create({
    data: {
      slug: 'core-initiative',
      company: 'Virtual Internship Core Initiative',
      role: 'Frontend Developer',
      type: 'Internship',
      summary: 'Enhanced web application features using React.js and Redux.',
      startDate: new Date('2023-05-01'),
      endDate: new Date('2023-06-30'),
      isCurrent: false,
      durationLabel: 'May 2023 - Jun 2023',
      monogram: 'VICI',
      sortOrder: 2,
      highlights: {
        create: [
          { text: 'Work with the development team to enhance web application features using React.js.', position: 1 },
          { text: 'Implement state management using Redux and Context API.', position: 2 },
          { text: 'Debug and resolve frontend issues to improve user experience.', position: 3 }
        ]
      }
    }
  });

  await prisma.experience.create({
    data: {
      slug: 'rakamin-academy',
      company: 'Virtual Internship Rakamin Academy',
      role: 'Frontend Developer',
      type: 'Internship',
      summary: 'Developed responsive UI components from scratch based on design specifications.',
      startDate: new Date('2023-03-01'),
      endDate: new Date('2023-04-30'),
      isCurrent: false,
      durationLabel: 'Mar 2023 - Apr 2023',
      monogram: 'VIRA',
      sortOrder: 3,
      highlights: {
        create: [
          { text: 'Developed responsive UI components from scratch based on design specifications.', position: 1 },
          { text: 'Optimize web performance by reducing load times and improving Core Web Vitals.', position: 2 }
        ]
      }
    }
  });

  await prisma.experience.create({
    data: {
      slug: 'diskominfo',
      company: 'Diskominfo',
      role: 'IT Support Intern',
      type: 'Internship',
      summary: 'Assisted in troubleshooting hardware and software issues for office computers.',
      startDate: new Date('2021-01-01'),
      endDate: new Date('2021-03-31'),
      isCurrent: false,
      durationLabel: 'Jan 2021 - Mar 2021',
      monogram: 'DISK',
      sortOrder: 4,
      highlights: {
        create: [
          { text: 'Assisted in troubleshooting hardware and software issues for office computers.', position: 1 },
          { text: 'Configured local network and ensured stable internet connectivity.', position: 2 },
          { text: 'Maintained documentation for IT assets and daily support logs.', position: 3 }
        ]
      }
    }
  });

  console.log('Inserting projects...');
  await prisma.project.create({
    data: {
      slug: 'pesonamu',
      title: 'Pesonamu',
      role: 'Web Developer',
      category: ProjectCategory.FULLSTACK,
      summary: 'Platform Sistem Informasi Pesonamu yang dibangun menggunakan framework CodeIgniter 4 untuk pengelolaan data dan administrasi pengguna.',
      featured: true,
      sortOrder: 1,
      skills: {
        create: [
          { skillId: getSkillId('CodeIgniter 4'), position: 1 },
          { skillId: getSkillId('PHP'), position: 2 },
          { skillId: getSkillId('Bootstrap'), position: 3 },
          { skillId: getSkillId('MySQL'), position: 4 },
          { skillId: getSkillId('JavaScript'), position: 5 }
        ]
      },
      highlights: {
        create: [
          { text: 'Pengembangan fitur dan arsitektur modul sistem berbasis CodeIgniter 4', position: 1 },
          { text: 'Perancangan antarmuka responsif dan ramah pengguna', position: 2 },
          { text: 'Integrasi basis data dan manajemen data terstruktur', position: 3 }
        ]
      }
    }
  });

  await prisma.project.create({
    data: {
      slug: 'raattajdid',
      title: 'RA At-Tajdid',
      role: 'Frontend Developer',
      category: ProjectCategory.FRONTEND,
      summary: 'Website profil dan informasi untuk RA At-Tajdid yang dikembangkan secara responsif dan interaktif menggunakan React.js dan integrasi database Firebase.',
      featured: true,
      sortOrder: 2,
      skills: {
        create: [
          { skillId: getSkillId('React.js'), position: 1 },
          { skillId: getSkillId('Firebase'), position: 2 },
          { skillId: getSkillId('JavaScript'), position: 3 },
          { skillId: getSkillId('CSS'), position: 4 }
        ]
      },
      highlights: {
        create: [
          { text: 'Pembuatan komponen antarmuka modern dan interaktif dengan React.js', position: 1 },
          { text: 'Integrasi layanan backend dan database realtime Firebase', position: 2 },
          { text: 'Optimalisasi tata letak responsif dan ramah pengguna di semua perangkat', position: 3 }
        ]
      }
    }
  });

  await prisma.project.create({
    data: {
      slug: 'olikompresor',
      title: 'Olikompresor',
      role: 'Frontend Developer',
      category: ProjectCategory.FRONTEND,
      summary: 'Platform web katalog dan manajemen produk Olikompresor dengan antarmuka dinamis dan sinkronisasi data Firebase.',
      featured: true,
      sortOrder: 3,
      skills: {
        create: [
          { skillId: getSkillId('HTML'), position: 1 },
          { skillId: getSkillId('CSS'), position: 2 },
          { skillId: getSkillId('JavaScript'), position: 3 },
          { skillId: getSkillId('Firebase'), position: 4 }
        ]
      },
      highlights: {
        create: [
          { text: 'Penyusunan struktur halaman web dengan semantik HTML dan styling modern CSS', position: 1 },
          { text: 'Logika interaktif dan manipulasi tampilan responsif menggunakan JavaScript', position: 2 },
          { text: 'Integrasi penyimpanan dan pengelolaan data produk menggunakan Firebase', position: 3 }
        ]
      }
    }
  });

  await prisma.project.create({
    data: {
      slug: 'retro-game',
      title: 'Retro Game',
      role: 'Frontend Developer',
      category: ProjectCategory.FRONTEND,
      summary: 'Aplikasi game berbasis web interaktif dengan gaya grafis retro yang dibangun murni menggunakan vanilla HTML, CSS, dan JavaScript.',
      featured: true,
      sortOrder: 4,
      skills: {
        create: [
          { skillId: getSkillId('HTML'), position: 1 },
          { skillId: getSkillId('CSS'), position: 2 },
          { skillId: getSkillId('JavaScript'), position: 3 }
        ]
      },
      highlights: {
        create: [
          { text: 'Implementasi mekanika game interaktif dan game loop dengan JavaScript murni', position: 1 },
          { text: 'Desain visual bertema retro arcade menggunakan animasi dan efek CSS', position: 2 },
          { text: 'Penanganan kontrol dan responsivitas input pengguna yang mulus', position: 3 }
        ]
      }
    }
  });

  console.log('Seed completed successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
