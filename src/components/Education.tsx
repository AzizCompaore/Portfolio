import React from 'react';
import { EDUCATION_DATA } from '../data/portfolioData';
import { GraduationCap, MapPin } from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';

export const Education: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section id="education" className="py-20 md:py-28 bg-[#FFF8F1]">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-widest text-[#F9A826] font-bold block mb-2">
            Formation
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#141416] tracking-tight font-sans">
            Academic <span className="text-[#F9A826]">Background</span>
          </h2>
          <p className="mt-3 text-sm text-neutral-500 font-medium">
            Cursus académique en informatique à Abidjan et fondations scientifiques.
          </p>
        </div>

        {/* Education 2-card Grid */}
        <div className="relative grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-5xl mx-auto">
          <motion.div
            aria-hidden="true"
            initial={shouldReduceMotion ? false : { scaleX: 0, opacity: 0 }}
            whileInView={{ scaleX: 1, opacity: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="hidden md:block absolute left-1/2 top-1/2 z-0 h-px w-8 -translate-x-1/2 bg-gradient-to-r from-[#F9A826]/20 via-[#F9A826] to-[#F9A826]/20 origin-center"
          />
          {EDUCATION_DATA.map((item, index) => (
            <motion.div
              key={item.institution}
              initial={shouldReduceMotion ? false : {
                opacity: 0,
                x: index === 0 ? -48 : 48,
                y: 30,
                rotateY: index === 0 ? 8 : -8,
                scale: 0.96,
              }}
              whileInView={{ opacity: 1, x: 0, y: 0, rotateY: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{
                duration: shouldReduceMotion ? 0 : 0.85,
                delay: shouldReduceMotion ? 0 : index * 0.18,
                ease: [0.22, 1, 0.36, 1],
              }}
              whileHover={shouldReduceMotion ? undefined : { y: -7, transition: { duration: 0.25 } }}
              className="group relative z-10 isolate overflow-hidden bg-white rounded-[32px] p-6 sm:p-8 border border-black/5 hover:border-[#F9A826]/40 shadow-soft hover:shadow-card-hover transition-[border-color,box-shadow] duration-300 flex flex-col justify-between transform-gpu"
            >
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-20 -top-24 -z-10 h-56 w-56 rounded-full bg-[#F9A826]/[0.07] blur-3xl transition-colors duration-500 group-hover:bg-[#F9A826]/[0.14]"
              />
              <div
                aria-hidden="true"
                className="absolute left-0 right-0 top-0 h-[2px] overflow-hidden"
              >
                <motion.div
                  initial={shouldReduceMotion ? false : { scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.9, delay: 0.2 + index * 0.18, ease: [0.22, 1, 0.36, 1] }}
                  className="h-full w-full origin-left bg-gradient-to-r from-[#F9A826] via-[#FFD27A] to-transparent"
                />
              </div>
              <span
                aria-hidden="true"
                className="pointer-events-none absolute right-6 top-14 select-none font-mono text-8xl font-black leading-none text-[#141416]/[0.035] transition-transform duration-500 group-hover:-translate-y-1 group-hover:scale-105"
              >
                0{index + 1}
              </span>

              <div>
                <div className="flex items-center justify-between mb-4">
                  <motion.div
                    initial={shouldReduceMotion ? false : { scale: 0.6, opacity: 0, rotate: -25 }}
                    whileInView={{ scale: 1, opacity: 1, rotate: 0 }}
                    viewport={{ once: true }}
                    transition={{ type: 'spring', stiffness: 220, damping: 14, delay: index * 0.18 + 0.25 }}
                    className="relative w-14 h-14 rounded-2xl bg-[#FFF8F1] flex items-center justify-center text-[#F9A826] border border-[#F9A826]/15 shadow-sm transition-colors duration-300 group-hover:bg-[#FFF5EB] group-hover:border-[#F9A826]/40"
                  >
                    <span aria-hidden="true" className="absolute inset-1 rounded-xl border border-[#F9A826]/10" />
                    <GraduationCap className="w-6 h-6 transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-110" />
                  </motion.div>
                  <motion.span
                    initial={shouldReduceMotion ? false : { opacity: 0, y: -10, scale: 0.9 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.18 + 0.32, ease: [0.22, 1, 0.36, 1] }}
                    className="relative z-10 px-3.5 py-1.5 rounded-full bg-[#FFF5EB] border border-[#F9A826]/10 text-xs font-bold text-[#F9A826] font-mono shadow-xs"
                  >
                    {item.period}
                  </motion.span>
                </div>

                <h3 className="relative z-10 text-2xl sm:text-[1.7rem] font-black text-[#141416] mb-1 font-sans tracking-tight">
                  {item.degree}
                </h3>

                <p className="text-sm font-bold text-neutral-800 mb-2">
                  {item.institution}
                </p>

                <div className="flex items-center gap-1.5 text-xs text-neutral-500 mb-5">
                  <MapPin className="w-3.5 h-3.5 text-[#F9A826]" />
                  <span>{item.location}</span>
                </div>

                <ul className="space-y-2.5 pt-4 border-t border-black/5 text-xs text-neutral-600 font-normal">
                  {item.details.map((detail, dIdx) => (
                    <motion.li
                      key={dIdx}
                      initial={shouldReduceMotion ? false : { opacity: 0, x: 12 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.45, delay: 0.35 + index * 0.18 + dIdx * 0.1 }}
                      className="flex items-start gap-2.5"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-[#F9A826] mt-1 shrink-0 ring-2 ring-[#F9A826]/10" />
                      <span className="leading-relaxed">{detail}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>

              <div className="mt-6 pt-4 border-t border-black/5 flex items-center justify-between text-[11px] font-mono text-neutral-400">
                <span>{index === 0 ? 'En cours (Licence 3)' : 'Diplôme Validé'}</span>
                <span>Côte d'Ivoire</span>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
