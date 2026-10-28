import React, { Suspense, lazy, useEffect, useState } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import {
  ArrowDown,
  ArrowUpRight,
  Atom,
  Box,
  Braces,
  Database,
  Download,
  GitBranch,
  Paintbrush,
  Route,
  Server
} from 'lucide-react'
import api from '../api/axios.js'
import Contact from './Contact.jsx'

const Scene3D = lazy(() => import('../components/Scene3D')) 

const FigmaIcon = () => (
  <svg aria-hidden="true" viewBox="0 0 32 48" width="30" height="36">
    <path fill="#f24e1e" d="M8 0h8v16H8a8 8 0 0 1 0-16Z" />
    <path fill="#ff7262" d="M16 0h8a8 8 0 0 1 0 16h-8V0Z" />
    <path fill="#a259ff" d="M8 16h8v16H8a8 8 0 0 1 0-16Z" />
    <circle cx="24" cy="24" r="8" fill="#1abcfe" />
    <path fill="#0acf83" d="M8 32h8v8a8 8 0 1 1-8-8Z" />
  </svg>
)

const PhotoshopIcon = () => (
  <svg aria-hidden="true" viewBox="0 0 40 40" width="36" height="36">
    <rect x="2" y="2" width="36" height="36" rx="8" fill="#001e36" />
    <text x="20" y="26" fill="#31a8ff" fontSize="18" fontWeight="700" textAnchor="middle">Ps</text>
  </svg>
)

const BlenderIcon = () => (
  <svg aria-hidden="true" viewBox="0 0 40 40" width="36" height="36" fill="none">
    <path d="M4 20h19M7 12l13 7M7 28l13-7" stroke="#f5792a" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" />
    <ellipse cx="24" cy="20" rx="12" ry="9" stroke="#f5792a" strokeWidth="4" />
    <circle cx="25" cy="20" r="5" fill="#265787" stroke="#fff" strokeWidth="2" />
  </svg>
)

const TypeScriptIcon = () => (
  <svg aria-hidden="true" viewBox="0 0 40 40" width="36" height="36">
    <rect width="40" height="40" rx="5" fill="#3178c6" />
    <text x="20" y="29" fill="white" fontSize="20" fontWeight="700" textAnchor="middle">TS</text>
  </svg>
)

const NextIcon = () => (
  <svg aria-hidden="true" viewBox="0 0 40 40" width="36" height="36" fill="none">
    <circle cx="20" cy="20" r="17" stroke="currentColor" strokeWidth="2" />
    <path d="M12 28V12l16 17V12" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" />
  </svg>
)

const technologies = [
  { name: 'React', Icon: Atom, color: 'text-cyan-300' },
  { name: 'Node.js', Icon: Server, color: 'text-green-400' },
  { name: 'Express', Icon: Route, color: 'text-slate-200' },
  { name: 'MongoDB', Icon: Database, color: 'text-emerald-400' },
  { name: 'JavaScript', Icon: Braces, color: 'text-yellow-300' },
  { name: 'Tailwind CSS', Icon: Paintbrush, color: 'text-sky-300' },
  { name: 'Three.js', Icon: Box, color: 'text-violet-300' },
  { name: 'Figma', Icon: FigmaIcon, color: 'text-white' },
  { name: 'Photoshop', Icon: PhotoshopIcon, color: 'text-sky-300' },
  { name: 'Blender', Icon: BlenderIcon, color: 'text-orange-300' },
  { name: 'TypeScript', Icon: TypeScriptIcon, color: 'text-blue-300' },
  { name: 'Next.js', Icon: NextIcon, color: 'text-white' }
]
const MotionDiv = motion.div
const MotionSpan = motion.span
const MotionArticle = motion.article
const greetingStars = [
  { left: '12%', top: '22%', size: 3, duration: 7, delay: -2 },
  { left: '29%', top: '76%', size: 2, duration: 9, delay: -5 },
  { left: '47%', top: '17%', size: 3, duration: 8, delay: -1 },
  { left: '68%', top: '72%', size: 2, duration: 10, delay: -6 },
  { left: '83%', top: '28%', size: 3, duration: 7.5, delay: -3 },
  { left: '94%', top: '63%', size: 2, duration: 9.5, delay: -4 }
]

const Home = () => {
  const shouldReduceMotion = useReducedMotion()
  const [projects, setProjects] = useState([])
  const [projectsLoading, setProjectsLoading] = useState(true)
  const [projectsError, setProjectsError] = useState('')

  useEffect(() => {
    let active = true

    api.get('/')
      .then(({ data }) => {
        if (active) setProjects(Array.isArray(data) ? data : [])
      })
      .catch(() => {
        if (active) setProjectsError('Could not load projects right now.')
      })
      .finally(() => {
        if (active) setProjectsLoading(false)
      })

    return () => {
      active = false
    }
  }, [])



  return (
    <div className='min-h-screen overflow-hidden bg-[#080d19] text-white'>
        <nav className='mx-auto flex max-w-7xl items-center justify-between px-6 py-6'>
          <a href="/" className='text-2xl font-bold tracking-tight'>
          <span className='text-blue-400'>{'<'}/</span>Sanjay
          </a>

          <div className='hidden gap-8 text-sm text-slate-30 md:flex'>
            <a href="#about" className='hover:text-blue-400'>About</a>
            <a href="#skills" className='hover:text-blue-400'>Skills</a>
            <a href="#projects" className='hover:text-blue-400'>Projects</a>
            <a href="#contact" className='hover:text-blue-400'>Contact</a>
          </div>
          <a href="/login"
          className='rounded-full border hidden border-white/15 px-4 py-2 text-sm hover:border-blue-400'
          >Admin</a>
        </nav>

        <section
          aria-label="Introduction"
          className="relative mx-auto max-w-7xl overflow-hidden px-6 pb-3 pt-2"
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -left-12 top-1/2 h-36 w-72 -translate-y-1/2 rounded-full bg-blue-500/10 blur-[70px]"
          />
          <MotionDiv
            initial={shouldReduceMotion ? false : { opacity: 0, y: 18, rotateX: -8 }}
            animate={{ opacity: 1, y: 0, rotateX: 0 }}
            transition={{ duration: 0.75, ease: 'easeOut' }}
            className="relative flex min-h-24 items-center gap-4 rounded-2xl border border-white/[0.08] bg-gradient-to-r from-white/[0.045] via-white/[0.02] to-transparent px-5 py-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] [perspective:900px] sm:px-8"
          >
            <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden rounded-2xl">
              {greetingStars.map((star, index) => (
                <MotionSpan
                  key={index}
                  className="absolute rounded-full bg-cyan-100 shadow-[0_0_10px_2px_rgba(103,232,249,0.7)]"
                  style={{
                    left: star.left,
                    top: star.top,
                    width: star.size,
                    height: star.size
                  }}
                  animate={shouldReduceMotion ? undefined : {
                    x: [0, 18, -8, 0],
                    y: [0, -10, 8, 0],
                    opacity: [0.2, 0.9, 0.35, 0.2],
                    scale: [0.7, 1.25, 0.85, 0.7]
                  }}
                  transition={shouldReduceMotion ? undefined : {
                    duration: star.duration,
                    delay: star.delay,
                    repeat: Infinity,
                    ease: 'easeInOut'
                  }}
                />
              ))}
            </div>
            <MotionSpan
              aria-hidden="true"
              animate={shouldReduceMotion ? undefined : {
                rotate: [0, 20, -8, 20, -4, 0],
                rotateY: [0, 28, -12, 24, 0],
                y: [0, -3, 0]
              }}
              transition={shouldReduceMotion ? undefined : {
                duration: 2.2,
                repeat: Infinity,
                repeatDelay: 1.8,
                ease: 'easeInOut'
              }}
              className="relative z-10 inline-flex origin-[70%_70%] text-4xl drop-shadow-[0_0_18px_rgba(96,165,250,0.45)] sm:text-5xl"
            >
              👋
            </MotionSpan>
            <div className="relative z-10 min-w-0">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-blue-300 sm:text-sm">
                Hi, I&apos;m
              </p>
              <MotionDiv
                initial={shouldReduceMotion ? false : { opacity: 0, x: 14 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: shouldReduceMotion ? 0 : 0.2 }}
                className="mt-1 text-2xl font-bold tracking-tight sm:text-3xl"
              >
                <span aria-label="Sanjay Pokhrel" className="bg-gradient-to-r from-white via-blue-100 to-cyan-300 bg-clip-text text-transparent">
                  {'Sanjay Pokhrel'.split('').map((character, index) => (
                    <MotionSpan
                      key={`${character}-${index}`}
                      aria-hidden="true"
                      initial={shouldReduceMotion ? false : { opacity: 0, y: 12, rotateX: -45 }}
                      animate={{ opacity: 1, y: 0, rotateX: 0 }}
                      transition={{
                        duration: shouldReduceMotion ? 0 : 0.45,
                        delay: shouldReduceMotion ? 0 : 0.35 + index * 0.045,
                        ease: 'easeOut'
                      }}
                      className="inline-block"
                    >
                      {character === ' ' ? '\u00a0' : character}
                    </MotionSpan>
                  ))}
                </span>
              </MotionDiv>
            </div>
            <div aria-hidden="true" className="relative z-10 ml-auto hidden items-center gap-2 sm:flex">
              <span className="h-px w-10 bg-gradient-to-r from-transparent to-blue-400/60" />
              <span className="h-2 w-2 rounded-full bg-cyan-300 shadow-[0_0_14px_rgba(103,232,249,0.8)]" />
            </div>
          </MotionDiv>
        </section>

        <section className='mx-auto grid max-w-7xl items-center gap-8 px-6 py-12 md:min-h-[78vh] md:grid-cols-2'>
          <MotionDiv
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          >
            <p className='mb-5 inline-flex rounded-full border border-blue-400/20 bg-blue-400/10 px-4 py-2 text-sm text-blue-300'>
                FULL STACK DEVELOPER
            </p>

            <h1 className='text-5xl font-bold leading-tight tracking-tight sm:text-6xl lg:text-7xl'>
                Building Digital
                <span className='block bg-gradient-to-r from-blue-400 to-violet-400 bg-clip-text text-transparent'>Experiences</span>
            </h1>

            <p className='mt-6 max-w-lg leading-7 text-slate-400'>
                I build modern web application with clean interfaces,
                thoughtful interactions, and reliable full-stack functionality
            </p>

            <div>
                <div className='mt-8 flex flex-wrap gap-4'>
                    <a href="#projects"
                    className='inline-flex items-center gap-2 rounded-full bg-blue-600 px-6 py-3 font-medium hover:bg-blue-500'
                    >
                     Explore Projects <ArrowUpRight size={18} />
                    </a>
                    <a href="#contact"
                    className='rounded-full border-white/15 px-6 py-3 hover:border-blue-400'
                    >
                        Contact me
                    </a>

                </div>

                <div className='mt-8 flex flex-wrap items-center gap-5 text-slate-400'>
                    <a
                      href="https://github.com/londaka"
                      target="_blank"
                      rel="noreferrer"
                      aria-label="GitHub"
                      className="inline-flex items-center gap-2 hover:text-white"
                    >
                        <GitBranch size={20} />
                        <span>GitHub</span>
                    </a>

                    <a
                      href="https://www.linkedin.com/in/sanjaya-pokhrel-9906ba285/"
                      target="_blank"
                      rel="noreferrer"
                      aria-label="LinkedIn"
                      className="inline-flex items-center gap-2 hover:text-white"
                    >
                        <span aria-hidden="true" className="flex h-5 w-5 items-center justify-center rounded-sm bg-current text-xs font-bold text-[#080d19]">in</span>
                        <span>LinkedIn</span>
                    </a>
                    <a
                      href="/CV.pdf"
                      download
                      className="inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-sm text-slate-300 transition hover:border-blue-400 hover:text-white"
                    >
                      <Download size={16} />
                      <span>Download CV</span>
                    </a>
                </div>
            </div>

          </MotionDiv>
             
             <MotionDiv
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1 }}
              className='relative min-h-[360px] md:min-h-[500px]'
             >
                <div className='pointer-events-none absolute inset-10 rounded-full bg-blue-600/20 blur-[90px]' />
                <Suspense 
                fallback={
                    <div className='h-[360px] animate-pulse rounded-full bg-blue-500/5 md:h-[500px]'/>
                }
                >
                 <Scene3D />
                </Suspense>

                <div className='absolute bottom-6 left-1/2 z-10 -translate-x-1/2 whitespace-nowrap text-xs tracking-[0.25em] text-slate-400'>
                    CREATIVITY MEETS CODE
                </div>
               
             </MotionDiv>
          
        </section>

        <a href="#about" className='mx-auto mb-10 flex w-fit items-center gap-2 text-sm text-slate-400'>
            Scroll to explore <ArrowDown size={16} />
        </a>

        <section id="about" className="border-t border-white/10 px-6 py-24">
            <div className="mx-auto max-w-4xl">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-blue-400">
            A little about me
          </p>
          <h2 className="mt-4 text-3xl font-bold sm:text-4xl">
            Turning ideas into meaningful web experiences.
          </h2>
          <p className="mt-5 max-w-2xl leading-8 text-slate-400">
            I'm a Full-Stack Developer passionate about building modern, reliable, and user-focused web applications.
            I enjoy turning ideas into functional products, from designing intuitive interfaces to developing the 
            backend systems and APIs that power them.
          </p>
        </div>
        </section>

        <section id="skills" className="border-t border-white/10 px-6 py-24">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm uppercase tracking-[0.25em] text-blue-400">My toolkit</p>
          <h2 className="mt-3 text-3xl font-bold">Technologies I work with</h2>
          <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-7">
            {technologies.map(({ name, Icon, color }, index) => (
              <MotionDiv
                key={name}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ y: -6, scale: 1.04 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.4, delay: index * 0.06 }}
                className="group flex min-h-36 flex-col items-center justify-center gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition-colors hover:border-blue-400/40 hover:bg-blue-400/[0.06]"
              >
                <MotionDiv
                  aria-hidden="true"
                  animate={shouldReduceMotion ? undefined : { rotate: 360 }}
                  transition={shouldReduceMotion ? undefined : {
                    duration: 14 + index * 2,
                    repeat: Infinity,
                    ease: 'linear'
                  }}
                  className={`${color} drop-shadow-[0_0_12px_currentColor]`}
                >
                  {React.createElement(Icon, { size: 34, strokeWidth: 1.7 })}
                </MotionDiv>
                <span className="text-center text-sm font-medium text-slate-300 group-hover:text-white">
                  {name}
                </span>
              </MotionDiv>
            ))}
          </div>
        </div>
      </section>

      <section id="projects" className="border-t border-white/10 px-6 py-24">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm uppercase tracking-[0.25em] text-blue-400">Selected work</p>
          <h2 className="mt-3 text-3xl font-bold">Projects that bring ideas to life.</h2>
          {projectsLoading ? (
            <p className="mt-6 text-slate-400">Loading projects...</p>
          ) : projectsError ? (
            <p role="alert" className="mt-6 text-red-300">{projectsError}</p>
          ) : projects.length === 0 ? (
            <p className="mt-6 text-slate-400">No published projects yet.</p>
          ) : (
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {projects.map((project) => (
                <MotionArticle
                  key={project._id}
                  initial={{ opacity: 0, y: 28 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  whileHover={{ y: -8, scale: 1.02 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.45, ease: 'easeOut' }}
                  className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] transition-colors hover:border-blue-400/40 hover:bg-white/[0.07]"
                >
                  {project.image && (
                    <img
                      src={project.image}
                      alt={`${project.title} project`}
                      className="h-48 w-full object-cover"
                      loading="lazy"
                    />
                  )}
                  <div className="p-6">
                    <h3 className="text-xl font-semibold">{project.title}</h3>
                    <p className="mt-3 leading-7 text-slate-400">{project.description}</p>
                    {Array.isArray(project.technologies) && project.technologies.length > 0 && (
                      <ul className="mt-4 flex flex-wrap gap-2">
                        {project.technologies.map((technology) => (
                          <li key={technology} className="rounded-full border border-white/10 px-3 py-1 text-xs text-slate-300">
                            {technology}
                          </li>
                        ))}
                      </ul>
                    )}
                    <div className="mt-5 flex flex-wrap gap-4 text-sm">
                      {project.githubUrl && (
                        <a href={project.githubUrl} target="_blank" rel="noreferrer" className="text-blue-300 hover:text-blue-200">
                          GitHub
                        </a>
                      )}
                      {project.liveUrl && (
                        <a href={project.liveUrl} target="_blank" rel="noreferrer" className="text-blue-300 hover:text-blue-200">
                          View project
                        </a>
                      )}
                    </div>
                  </div>
                </MotionArticle>
              ))}
            </div>
          )}
        </div>
      </section>

       <Contact />
       
      <footer className="border-t border-white/10 px-6 py-6 text-center text-sm text-slate-500">
        © {new Date().getFullYear()} Sanjay. Built with React and creativity.
      </footer>
        
        

    </div>
  )
}

export default Home