import React, { useState } from 'react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { Mail, Linkedin, Github, Copy, Check, Send, ArrowUpRight } from 'lucide-react';

export const Contact: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const [name, setName] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const mailSubject = encodeURIComponent(subject || `Prise de contact via Portfolio — ${name || 'Nouveau message'}`);
    const mailBody = encodeURIComponent(
      `Bonjour Abdoul Aziz,\n\n${message || 'Je souhaiterais échanger avec vous concernant un projet ou une opportunité professionnelle.'}\n\nCordialement,\n${name || 'Votre interlocuteur'}`
    );
    window.location.href = `mailto:${PERSONAL_INFO.email}?subject=${mailSubject}&body=${mailBody}`;
  };

  return (
    <section id="contact" className="py-20 md:py-28 bg-[#FFF8F1]">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Contact Big Card (Perez style) */}
        <div className="bg-[#141416] rounded-[40px] sm:rounded-[48px] p-8 sm:p-12 md:p-16 text-white shadow-2xl relative overflow-hidden">
          
          {/* Subtle amber ambient blur */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#F9A826]/10 blur-[100px] pointer-events-none rounded-full" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 relative z-10">
            
            {/* Left: Contact Info & Action Links */}
            <div className="lg:col-span-5 flex flex-col justify-between">
              <div>
                <span className="text-xs uppercase tracking-widest text-[#F9A826] font-bold block mb-3">
                  Let's Connect
                </span>

                <h2 className="text-4xl sm:text-5xl font-black text-white tracking-tight leading-tight mb-4 font-sans">
                  Let's work <br />
                  <span className="text-[#F9A826]">together.</span>
                </h2>

                <p className="text-sm text-neutral-400 font-medium leading-relaxed mb-8">
                  Disponible pour échanger sur des projets de développement full-stack, d'intégration d'intelligence artificielle ou des opportunités de collaboration.
                </p>

                {/* Email Display & Copy */}
                <div className="p-5 rounded-2xl bg-white/5 border border-white/10 mb-6">
                  <span className="text-[11px] font-mono uppercase text-neutral-400 block mb-1">
                    Email direct
                  </span>
                  <a
                    href={`mailto:${PERSONAL_INFO.email}`}
                    className="text-lg sm:text-xl font-bold text-white hover:text-[#F9A826] transition-colors break-all block mb-3"
                  >
                    {PERSONAL_INFO.email}
                  </a>

                  <button
                    onClick={handleCopyEmail}
                    className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-xs font-semibold text-neutral-200 transition-colors cursor-pointer"
                  >
                    {copied ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-emerald-400">Email copié !</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 text-[#F9A826]" />
                        <span>Copier l'email</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Social Channels */}
              <div className="flex flex-col gap-3 pt-6 border-t border-white/10">
                <a
                  href={PERSONAL_INFO.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between p-3.5 rounded-xl bg-white/5 hover:bg-white/10 transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <Linkedin className="w-4 h-4 text-[#F9A826]" />
                    <span className="text-sm font-semibold text-neutral-200">LinkedIn Profile</span>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-neutral-400 group-hover:text-white transition-colors" />
                </a>

                <a
                  href={PERSONAL_INFO.github}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between p-3.5 rounded-xl bg-white/5 hover:bg-white/10 transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <Github className="w-4 h-4 text-[#F9A826]" />
                    <span className="text-sm font-semibold text-neutral-200">GitHub Profile</span>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-neutral-400 group-hover:text-white transition-colors" />
                </a>
              </div>
            </div>

            {/* Right: Functional Message Form */}
            <div className="lg:col-span-7 bg-white/5 border border-white/10 rounded-[32px] p-6 sm:p-8">
              <h3 className="text-xl font-bold text-white mb-2">
                Envoyer un message direct
              </h3>
              <p className="text-xs text-neutral-400 mb-6">
                Remplissez ces champs pour ouvrir instantanément votre logiciel de messagerie avec un message prérempli.
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
                    Votre Nom ou Entreprise
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Ex: Entreprise Tech / Partenaire"
                    className="w-full bg-white/10 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-neutral-500 focus:outline-none focus:border-[#F9A826]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
                    Objet
                  </label>
                  <input
                    type="text"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder="Ex: Opportunité Full-Stack / Projet IA"
                    className="w-full bg-white/10 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-neutral-500 focus:outline-none focus:border-[#F9A826]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
                    Message
                  </label>
                  <textarea
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Parlez-moi de votre besoin ou de votre proposition..."
                    className="w-full bg-white/10 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-neutral-500 focus:outline-none focus:border-[#F9A826] resize-none"
                  />
                </div>

                <div className="pt-2 flex items-center justify-between">
                  <span className="text-[11px] text-neutral-400">
                    Abidjan, Côte d'Ivoire
                  </span>

                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-[#F9A826] hover:bg-[#E89512] text-[#141416] font-bold text-xs uppercase tracking-wider rounded-full transition-all shadow-md cursor-pointer"
                  >
                    <span>Ouvrir l'email</span>
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </div>
              </form>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
