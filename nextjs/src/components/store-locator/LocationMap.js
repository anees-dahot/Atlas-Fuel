'use client'

import {useEffect, useMemo, useRef, useState} from 'react'
import gsap from 'gsap'
import {ScrollTrigger} from 'gsap/ScrollTrigger'
import CmsImage from '@/components/common/CmsImage'

if (typeof window !== 'undefined') gsap.registerPlugin(ScrollTrigger)

const numericCoordinate = (value) => {
  const number = Number(value)
  return Number.isFinite(number) ? number : null
}

const phoneHref = (phone) => `tel:${String(phone ?? '').replace(/[^+\d]/g, '')}`

const directionsHref = (location) =>
  location.mapLink ||
  `https://www.google.com/maps/dir/?api=1&destination=${location.latitude},${location.longitude}`

export default function LocationMap({data, locationsData}) {
  const sectionRef = useRef(null)
  const mapNodeRef = useRef(null)
  const [selectedLocation, setSelectedLocation] = useState(null)
  const [mapReady, setMapReady] = useState(false)

  const locations = useMemo(
    () => (Array.isArray(locationsData?.locations) ? locationsData.locations : []),
    [locationsData?.locations]
  )

  const mappableLocations = useMemo(
    () => locations
      .map((location) => ({
        ...location,
        latitude: numericCoordinate(location.latitude),
        longitude: numericCoordinate(location.longitude),
      }))
      .filter(
        (location) =>
          location.showOnMap !== false &&
          location.latitude !== null &&
          location.longitude !== null
      ),
    [locations]
  )

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.lm-content', {
        opacity: 0,
        y: 50,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {trigger: sectionRef.current, start: 'top 75%', once: true},
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  useEffect(() => {
    if (!mapNodeRef.current || !mappableLocations.length) return undefined

    let cancelled = false
    let map

    const setupMap = async () => {
      const leafletModule = await import('leaflet')
      if (cancelled || !mapNodeRef.current) return

      const L = leafletModule.default || leafletModule
      const zoom = Math.min(18, Math.max(3, Number(data?.defaultZoom) || 15))
      const first = mappableLocations[0]

      map = L.map(mapNodeRef.current, {
        center: [first.latitude, first.longitude],
        zoom,
        scrollWheelZoom: false,
        zoomControl: true,
      })

      L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(map)

      const bounds = []
      mappableLocations.forEach((location) => {
        const point = [location.latitude, location.longitude]
        bounds.push(point)
        const marker = L.marker(point, {
          title: location.name || location.address || 'Atlas Fuel location',
          keyboard: true,
          icon: L.divIcon({
            className: 'atlas-leaflet-marker-shell',
            html: '<span class="atlas-leaflet-marker" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M12 2a7 7 0 0 0-7 7c0 5.25 7 13 7 13s7-7.75 7-13a7 7 0 0 0-7-7Z"/><circle cx="12" cy="9" r="2.6"/></svg></span>',
            iconSize: [48, 58],
            iconAnchor: [24, 54],
          }),
        }).addTo(map)

        marker.on('click', () => {
          setSelectedLocation(location)
          map.flyTo(point, Math.max(map.getZoom(), 16), {duration: 0.6})
        })
      })

      if (bounds.length > 1) {
        map.fitBounds(bounds, {padding: [70, 70], maxZoom: zoom})
      }

      setMapReady(true)
      window.setTimeout(() => map?.invalidateSize(), 50)
    }

    setupMap()

    return () => {
      cancelled = true
      setMapReady(false)
      map?.remove()
    }
  }, [data?.defaultZoom, mappableLocations])

  return (
    <section ref={sectionRef} className="py-20 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="lm-content">
          <div className="text-center mb-12">
            {data?.eyebrow && (
              <span className="text-primary text-sm font-bold uppercase tracking-[0.2em] mb-4 block">
                {data.eyebrow}
              </span>
            )}
            {data?.heading && (
              <h2 className="text-4xl md:text-5xl font-heading font-bold text-gray-900 uppercase tracking-tight mb-4">
                {data.heading}
              </h2>
            )}
            {data?.description && (
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">{data.description}</p>
            )}
          </div>

          <div
            className="atlas-location-map relative min-h-[520px] lg:min-h-[640px] overflow-hidden border border-gray-200 bg-gray-100 shadow-[0_24px_70px_rgba(15,35,24,0.12)]"
            aria-label={data?.mapAriaLabel || 'Atlas Fuel store locations map'}
          >
            {mappableLocations.length ? (
              <>
                <div ref={mapNodeRef} className="absolute inset-0" />
                {!mapReady && (
                  <div className="absolute inset-0 z-[500] grid place-items-center bg-gray-100 text-gray-600">
                    {data?.mapLoadingText || 'Loading interactive map...'}
                  </div>
                )}
                {data?.markerHintText && (
                  <div className="absolute left-4 top-4 z-[600] max-w-[260px] bg-black/80 px-4 py-3 text-sm font-semibold text-white shadow-lg backdrop-blur-sm">
                    {data.markerHintText}
                  </div>
                )}
              </>
            ) : (
              <div className="absolute inset-0 grid place-items-center bg-gradient-to-br from-gray-100 to-gray-200 px-6 text-center">
                <div>
                  <MapPinIcon className="mx-auto mb-5 h-14 w-14 text-primary" />
                  <p className="max-w-md text-lg font-semibold text-gray-700">
                    {data?.mapUnavailableText || 'No store coordinates are available yet.'}
                  </p>
                </div>
              </div>
            )}

            {selectedLocation && (
              <StoreDialog
                location={selectedLocation}
                labels={locationsData}
                onClose={() => setSelectedLocation(null)}
              />
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

function StoreDialog({location, labels, onClose}) {
  const features = Array.isArray(location.features) ? location.features : []

  useEffect(() => {
    const closeOnEscape = (event) => {
      if (event.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', closeOnEscape)
    return () => window.removeEventListener('keydown', closeOnEscape)
  }, [onClose])

  return (
    <div
      role="dialog"
      aria-modal="false"
      aria-labelledby="store-map-dialog-title"
      className="absolute inset-x-3 bottom-3 z-[700] max-h-[calc(100%-1.5rem)] overflow-y-auto bg-white shadow-[0_30px_90px_rgba(0,0,0,0.32)] sm:inset-x-auto sm:left-5 sm:bottom-5 sm:w-[430px]"
    >
      {(location.image?.asset || location.imageUrl) && (
        <div className="relative h-40 overflow-hidden bg-gray-100">
          <CmsImage
            value={location.image ?? location.imageUrl}
            alt={location.image?.alt || location.name}
            fill
            sizes="(max-width: 640px) 100vw, 430px"
            className="object-cover"
          />
        </div>
      )}

      <button
        type="button"
        onClick={onClose}
        aria-label={labels?.closeDialogLabel || 'Close store details'}
        className="absolute right-3 top-3 z-10 grid h-10 w-10 place-items-center rounded-full bg-black/80 text-white shadow-lg transition hover:bg-black focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
      >
        <CloseIcon />
      </button>

      <div className="p-6 sm:p-7">
        <div className="mb-5 pr-10">
          <span className="mb-2 block text-xs font-bold uppercase tracking-[0.18em] text-primary">
            {location.badge || labels?.dialogEyebrow || 'Atlas Fuel Station'}
          </span>
          <h3 id="store-map-dialog-title" className="font-heading text-3xl font-bold uppercase leading-none text-gray-900">
            {location.name}
          </h3>
          {location.summary && <p className="mt-3 text-sm leading-6 text-gray-600">{location.summary}</p>}
        </div>

        <div className="space-y-3 border-y border-gray-100 py-5">
          {location.address && <DialogRow icon={<MapPinIcon />} label={labels?.addressLabel} value={location.address} />}
          {location.hours && <DialogRow icon={<ClockIcon />} label={labels?.hoursLabel} value={location.hours} />}
          {location.phone && <DialogRow icon={<PhoneIcon />} label={labels?.phoneLabel} value={location.phone} href={phoneHref(location.phone)} />}
          {location.email && <DialogRow icon={<EmailIcon />} label={labels?.emailLabel} value={location.email} href={`mailto:${location.email}`} />}
        </div>

        {features.length > 0 && (
          <div className="mt-5 flex flex-wrap gap-2">
            {features.map((feature, index) => (
              <span key={feature._key || feature.label || index} className="bg-primary/10 px-3 py-2 text-xs font-bold uppercase tracking-wide text-primary-dark">
                {feature.label}{feature.value ? `: ${feature.value}` : ''}
              </span>
            ))}
          </div>
        )}

        <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
          <a
            href={directionsHref(location)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-12 items-center justify-center gap-2 bg-primary px-4 py-3 text-center text-sm font-bold uppercase tracking-wide text-white transition hover:bg-primary-dark"
          >
            <DirectionsIcon />
            {labels?.directionsButtonText || 'Get Directions'}
          </a>
          {location.phone && (
            <a
              href={phoneHref(location.phone)}
              className="inline-flex min-h-12 items-center justify-center gap-2 border-2 border-gray-900 px-4 py-3 text-center text-sm font-bold uppercase tracking-wide text-gray-900 transition hover:bg-gray-900 hover:text-white"
            >
              <PhoneIcon />
              {labels?.callButtonText || 'Call Store'}
            </a>
          )}
        </div>
      </div>
    </div>
  )
}

function DialogRow({icon, label, value, href}) {
  const valueNode = href ? (
    <a href={href} className="text-sm text-gray-700 transition hover:text-primary">{value}</a>
  ) : (
    <p className="text-sm text-gray-700">{value}</p>
  )

  return (
    <div className="flex items-start gap-3">
      <span className="mt-0.5 h-5 w-5 flex-none text-primary">{icon}</span>
      <div>
        {label && <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-gray-400">{label}</p>}
        {valueNode}
      </div>
    </div>
  )
}

const iconProps = {viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.8}

function MapPinIcon({className = 'h-5 w-5'}) {
  return <svg className={className} {...iconProps}><path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z" /><circle cx="12" cy="10" r="2.5" /></svg>
}

function ClockIcon() {
  return <svg {...iconProps}><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></svg>
}

function PhoneIcon() {
  return <svg {...iconProps}><path d="M22 16.9v3a2 2 0 0 1-2.2 2A19.8 19.8 0 0 1 3.1 5.2 2 2 0 0 1 5.1 3h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.4 2.1L9.1 10.9a16 16 0 0 0 4 4l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2Z" /></svg>
}

function EmailIcon() {
  return <svg {...iconProps}><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></svg>
}

function DirectionsIcon() {
  return <svg className="h-5 w-5" {...iconProps}><path d="m14 4 6 6-6 6" /><path d="M20 10H9a5 5 0 0 0-5 5v5" /></svg>
}

function CloseIcon() {
  return <svg className="h-5 w-5" {...iconProps}><path d="m6 6 12 12M18 6 6 18" /></svg>
}
