import { ArrowRight, Briefcase, LoaderIcon, Search, TrendingUp, Globe, Zap, Award, BadgeCheck, Building, GraduationCap, FileText, Users } from "lucide-react"
import { Button } from "./ui/button"
import Link from "next/link"

import {motion} from "motion/react"
import { Radar, IconContainer } from "./ui/radar-effect"

const Hero = () => {
   
    
  return (
   <section className="relative min-h-dvh flex items-center justify-center flex-col overflow-hidden bg-background">
      <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none opacity-40 dark:opacity-25">
        <Radar className="scale-[1.8] md:scale-[2.5] lg:scale-[3]" />
      </div>

      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute left-[8%] top-[15%] hidden md:block">
          <IconContainer
            text="Internships"
            delay={0.2}
            icon={<GraduationCap className="h-6 w-6 text-blue-500" />}
          />
        </div>
        <div className="absolute left-[27%] top-[8%] hidden lg:block">
          <IconContainer
            text="Remote Work"
            delay={0.9}
            icon={<Globe className="h-6 w-6 text-cyan-500" />}
          />
        </div>
        <div className="absolute right-[32%] top-[10%] hidden lg:block">
          <IconContainer
            text="Instant Apply"
            delay={1.1}
            icon={<Zap className="h-6 w-6 text-amber-400" />}
          />
        </div>
        <div className="absolute right-[10%] top-[18%] hidden md:block">
          <IconContainer
            text="Full-time Jobs"
            delay={0.4}
            icon={<Briefcase className="h-6 w-6 text-red-500" />}
          />
        </div>
        <div className="absolute left-[37%] top-[65%] -translate-y-1/2 hidden lg:block">
          <IconContainer
            text="Resume Analysis"
            delay={0.3}
            icon={<FileText className="h-6 w-6 text-emerald-500" />}
          />
        </div>
        <div className="absolute right-[5%] top-[48%] -translate-y-1/2 hidden lg:block">
          <IconContainer
            text="Top Companies"
            delay={0.5}
            icon={<Building className="h-6 w-6 text-indigo-500" />}
          />
        </div>
        <div className="absolute left-[28%] bottom-[8%] hidden lg:block">
          <IconContainer
            text="Skill Tests"
            delay={0.8}
            icon={<Award className="h-6 w-6 text-yellow-500" />}
          />
        </div>

        <div className="absolute right-[25%] bottom-[17%] hidden lg:block">
          <IconContainer
            text="Verified Employers"
            delay={1.0}
            icon={<BadgeCheck className="h-6 w-6 text-teal-500" />}
          />
        </div>

        <div className="absolute left-[46%] bottom-[15%] hidden md:block">
          <IconContainer
            text="Hiring Recruiters"
            delay={0.6}
            icon={<Users className="h-6 w-6 text-amber-500" />}
          />
        </div>

        <div className="absolute right-[12%] bottom-[12%] hidden md:block">
          <IconContainer
            text="Salary Growth"
            delay={0.7}
            icon={<TrendingUp className="h-6 w-6 text-violet-500" />}
          />
        </div>
      </div>

    <div className="container relative z-10 w-full mx-auto px-5 py-24 md:py-24 flex flex-col items-center justify-center min-h-dvh">
        <div className="w-full max-w-5xl flex flex-col items-center text-center md:items-start md:text-left gap-8 md:gap-10">

            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary text-sm font-medium">
               <TrendingUp size={16} className="text-blue-600" />
               <span>#1 Job Portal in India</span>
            </div>
            

            <div className="flex flex-col gap-5 w-full max-w-4xl">
                <motion.h2 initial={{opacity:0,y:-20}} animate={{opacity:1,y:0}} transition={{duration:1}} className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.15] text-black dark:text-white tracking-tight">
                    Find Your Dream Job at <span className="text-red-500">Ez<span className="bg-linear-to-r bg-clip-text text-transparent from-blue-500 via-red-400 to-blue-800">Hire</span></span>
                </motion.h2>
                <p className="text-base sm:text-lg md:text-xl leading-relaxed opacity-80 max-w-2xl md:mx-0 mx-auto">
                    Connect with top employers and discover opportunities that match your skills and interests. Whether you are a job seeker or recruiter, we have got you covered with powerful tools and a seamless experience.
                </p>
            </div>


            <div className="flex flex-wrap justify-center md:justify-start gap-6 sm:gap-10 py-2">
                <div className="flex flex-col items-center md:items-start">
                    <p className="text-2xl sm:text-3xl font-bold text-blue-600">10k+</p>
                    <p className="text-xs sm:text-sm opacity-80 font-medium">Active Jobs</p>
                </div>
                <div className="flex flex-col items-center md:items-start">
                    <p className="text-2xl sm:text-3xl font-bold text-blue-600">5k+</p>
                    <p className="text-xs sm:text-sm opacity-80 font-medium">Companies</p>
                </div>
                <div className="flex flex-col items-center md:items-start">
                    <p className="text-2xl sm:text-3xl font-bold text-blue-600">50k+</p>
                    <p className="text-xs sm:text-sm opacity-80 font-medium">Job Requests</p>
                </div>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto">
                <Link href="/jobs" className="flex-1 sm:flex-none">
                     <Button size="lg" className="w-full text-base px-8 h-14 sm:h-12 gap-2 group transition-all">
                        <Search className="group-hover:scale-125 transition-all" size={18} /> Browse Jobs <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" /> 
                     </Button>
                </Link>
                <Link href="/about" className="flex-1 sm:flex-none">
                    <Button variant="outline" size="lg" className="w-full text-base px-8 h-14 sm:h-12 gap-2">
                        <Briefcase size={18} /> Learn More
                    </Button>
                </Link>
            </div>

        </div>
    </div>
   </section>
  )
}

export default Hero
