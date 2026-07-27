'use client'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
if (typeof window !== 'undefined') gsap.registerPlugin(ScrollTrigger)

export default function InternationalEnquiries() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.ie-content', { opacity: 0, y: 50, duration: 1, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 75%', once: true }
      })
      gsap.from('.ie-contact-card', { opacity: 0, y: 30, duration: 0.8, stagger: 0.15, ease: 'power3.out',
        scrollTrigger: { trigger: '.ie-contacts', start: 'top 85%', once: true }
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="py-20 lg:py-24 bg-sand">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="ie-content">
            <span className="text-primary text-sm font-bold uppercase tracking-[0.2em] mb-4 block">Get in Touch</span>
            <h2 className="text-4xl md:text-5xl font-heading font-bold uppercase tracking-tight text-gray-900 mb-8">Contact Us</h2>
            <p className="text-lg text-gray-600 leading-relaxed mb-8">
              If you have any questions or need help, feel free to contact our team, or you can call us any time.
            </p>

            <div className="mb-8">
              <h3 className="text-2xl font-bold uppercase tracking-wide mb-4">International Enquiries</h3>
              <p className="text-gray-300 leading-relaxed mb-6">
                We are available 24/7 to look after our international clients, please don't hesitate to contact us through WhatsApp:
              </p>
              <a href="https://wa.me/61428935216" target="_blank" rel="noopener noreferrer" 
                 className="group inline-flex items-center gap-3 px-8 py-4 bg-green-600 text-white font-bold uppercase tracking-wide hover:bg-green-700 transition-all duration-300 hover:scale-105">
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                WhatsApp: +61 428 935 216
              </a>
            </div>
          </div>

          <div className="ie-contacts grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="ie-contact-card bg-white p-6 border border-sand">
              <h3 className="text-xl font-bold uppercase tracking-wide text-gray-900 mb-4">Corporate Office</h3>
              <p className="text-gray-600 mb-2">1 Mandurah Rd, Kwinana Beach WA 6167, Australia</p>
              <a href="tel:+61863777644" className="text-primary hover:text-primary-dark transition-colors block mb-2">+61 8 6377 7644</a>
              <a href="mailto:info@atlasfuel.com.au" className="text-gray-600 hover:text-primary transition-colors">info@atlasfuel.com.au</a>
            </div>
            <div className="ie-contact-card bg-white p-6 border border-sand">
              <h3 className="text-xl font-bold uppercase tracking-wide text-gray-900 mb-4">Australia Office</h3>
              <p className="text-gray-600 mb-2">1 Mandurah Rd, Kwinana Beach WA 6167, Australia</p>
              <a href="tel:+61863777644" className="text-primary hover:text-primary-dark transition-colors block mb-2">+61 8 6377 7644</a>
              <a href="mailto:info@atlasfuel.com.au" className="text-gray-600 hover:text-primary transition-colors">info@atlasfuel.com.au</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
