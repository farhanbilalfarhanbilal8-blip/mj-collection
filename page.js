npx create-next-app@latest mj-collection
# Select: TypeScript (No), Tailwind (Yes), ESLint (Yes), App Router (Yes)
cd mj-collection
npm install framer-motion lucide-react react-hook-form @react-three/fiber @react-three/drei                         
// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          400: '#D4AF37',
          500: '#C5A028',
          600: '#B59019',
        },
        luxury: {
          black: '#050505',
          dark: '#0A0A0A',
          gray: '#1A1A1A',
        }
      },
      fontFamily: {
        serif: ['Playfair Display', 'serif'], // Add this font in layout.js
        sans: ['Montserrat', 'sans-serif'],   // Add this font in layout.js
      }
    },
  },
  plugins: [],
};
import { Playfair_Display, Montserrat } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({ subsets: ["latin"], variable: '--font-playfair' });
const montserrat = Montserrat({ subsets: ["latin"], variable: '--font-montserrat' });

export const metadata = {
  title: "MJ Collection | Maji Collection - Premium Suits",
  description: "Luxury men's and women's suits. Where elegance meets perfection.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${playfair.variable} ${montserrat.variable} bg-luxury-black text-white antialiased`}>
        {children}
      </body>
    </html>
  );
}
"use client";

import React, { useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Menu, X, Instagram, Facebook, Twitter, Send, MessageCircle } from "lucide-react";

// --- Components ---

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? "bg-luxury-black/90 backdrop-blur-md py-4" : "bg-transparent py-6"}`}>
      <div className="container mx-auto px-6 flex justify-between items-center">
        <div className="text-2xl font-serif font-bold text-gold-400 tracking-widest">MJ COLLECTION</div>
        
        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-8 font-sans text-sm tracking-widest uppercase">
          {["Home", "About", "Collections", "Gallery", "Contact"].map((item) => (
            <a key={item} href={`#${item.toLowerCase()}`} className="hover:text-gold-400 transition-colors duration-300">
              {item}
            </a>
          ))}
        </div>

        {/* Mobile Toggle */}
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)} className="text-white">
            {isOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute top-full left-0 w-full bg-luxury-dark p-6 md:hidden border-b border-gray-800"
        >
          {["Home", "About", "Collections", "Gallery", "Contact"].map((item) => (
            <a 
              key={item} 
              href={`#${item.toLowerCase()}`} 
              onClick={() => setIsOpen(false)}
              className="block py-3 text-center hover:text-gold-400 uppercase tracking-widest"
            >
              {item}
            </a>
          ))}
        </motion.div>
      )}
    </nav>
  );
};

const Hero = () => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden bg-luxury-black">
      {/* Abstract 3D Background Elements (Simulated with CSS/Framer) */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-luxury-gray via-luxury-black to-luxury-black opacity-80"></div>
        <motion.div 
          style={{ y: y1 }}
          className="absolute top-1/4 right-10 w-96 h-96 bg-gold-600/10 rounded-full blur-3xl"
        />
        <motion.div 
          style={{ y: useTransform(scrollY, [0, 500], [0, -200]) }}
          className="absolute bottom-1/4 left-10 w-64 h-64 bg-gold-400/5 rounded-full blur-3xl"
        />
      </div>

      <div className="container mx-auto px-6 z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <h2 className="text-gold-400 tracking-[0.5em] uppercase mb-4 text-sm md:text-base">Est. 2024</h2>
          <h1 className="text-6xl md:text-9xl font-serif font-bold text-white mb-6 leading-tight">
            MJ <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-400 to-gold-600">Collection</span>
          </h1>
          <p className="text-gray-400 text-lg md:text-xl font-light mb-10 tracking-wide max-w-2xl mx-auto">
            Where Elegance Meets Perfection.
          </p>
          
          <div className="flex flex-col md:flex-row gap-6 justify-center">
            <button className="px-8 py-4 bg-gold-500 text-luxury-black font-bold uppercase tracking-widest hover:bg-white transition-all duration-300 clip-path-slant">
              Shop Now
            </button>
            <button className="px-8 py-4 border border-gold-400 text-gold-400 uppercase tracking-widest hover:bg-gold-400 hover:text-luxury-black transition-all duration-300">
              Contact Us
            </button>
          </div>
        </motion.div>
      </div>
      
      {/* Scroll Indicator */}
      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-gold-400"
      >
        <div className="w-[1px] h-16 bg-gradient-to-b from-gold-400 to-transparent mx-auto"></div>
      </motion.div>
    </section>
  );
};

const About = () => (
  <section id="about" className="py-24 bg-luxury-dark">
    <div className="container mx-auto px-6">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="h-[500px] bg-luxury-gray relative overflow-hidden group"
        >
           {/* Placeholder for Brand Image */}
           <div className="absolute inset-0 bg-neutral-800 flex items-center justify-center text-neutral-600 text-9xl font-serif select-none group-hover:scale-105 transition-transform duration-700">
             MJ
           </div>
           <div className="absolute inset-0 border border-gold-400/30 translate-x-4 translate-y-4"></div>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <h3 className="text-gold-400 uppercase tracking-widest mb-2">Our Story</h3>
          <h2 className="text-4xl font-serif mb-6">Redefining Modern Luxury</h2>
          <p className="text-gray-400 leading-relaxed mb-6 font-light">
            MJ Collection (Maji Collection) represents the pinnacle of sartorial elegance. 
            We blend traditional craftsmanship with contemporary design to create suits 
            that speak volumes about your personality.
          </p>
          <p className="text-gray-400 leading-relaxed mb-8 font-light">
            Our mission is to provide perfect fits for both men and women, ensuring confidence 
            in every step you take.
          </p>
          <div className="flex gap-8">
            <div>
              <h4 className="text-3xl font-serif text-white">500+</h4>
              <p className="text-sm text-gold-400 uppercase">Suits Sold</p>
            </div>
            <div>
              <h4 className="text-3xl font-serif text-white">100%</h4>
              <p className="text-sm text-gold-400 uppercase">Satisfaction</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  </section>
);

const CollectionCard = ({ title, category, image, delay }) => (
  <motion.div 
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.6 }}
    viewport={{ once: true }}
    className="group relative h-[600px] overflow-hidden cursor-pointer"
  >
    <div className="absolute inset-0 bg-neutral-800">
       {/* Use Next/Image in real app */}
       <div className="w-full h-full bg-neutral-700 group-hover:scale-110 transition-transform duration-700 ease-out" />
    </div>
    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-500"></div>
    
    <div className="absolute bottom-0 left-0 p-8 w-full">
      <p className="text-gold-400 uppercase tracking-widest text-sm mb-2">{category}</p>
      <h3 className="text-3xl font-serif text-white mb-4">{title}</h3>
      <div className="flex items-center text-white gap-2 group-hover:gap-4 transition-all duration-300">
        <span className="uppercase text-sm tracking-widest">Explore Collection</span>
        <ArrowRight className="w-4 h-4" />
      </div>
    </div>
  </motion.div>
);

const Collections = () => (
  <section id="collections" className="py-24 bg-luxury-black">
    <div className="container mx-auto px-6">
      <div className="text-center mb-16">
        <h2 className="text-



