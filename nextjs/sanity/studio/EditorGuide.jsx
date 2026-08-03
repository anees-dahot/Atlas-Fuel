const green = '#17a350'
const dark = '#10231a'

const cardStyle = {
  background: '#fff',
  border: '1px solid #e4e9e6',
  borderRadius: 12,
  boxShadow: '0 12px 35px rgba(16,35,26,0.07)',
  padding: 24,
}

const stepStyle = {
  alignItems: 'center',
  background: green,
  borderRadius: 999,
  color: '#fff',
  display: 'inline-flex',
  flex: '0 0 auto',
  fontSize: 13,
  fontWeight: 800,
  height: 30,
  justifyContent: 'center',
  width: 30,
}

function GuideStep({number, title, children}) {
  return (
    <div style={{display: 'flex', gap: 14, marginTop: 18}}>
      <span style={stepStyle}>{number}</span>
      <div>
        <strong style={{color: dark, display: 'block', fontSize: 16, marginBottom: 4}}>{title}</strong>
        <span style={{color: '#526158', fontSize: 14, lineHeight: 1.6}}>{children}</span>
      </div>
    </div>
  )
}

function GuideCard({title, eyebrow, children}) {
  return (
    <section style={cardStyle}>
      <span style={{color: green, fontSize: 11, fontWeight: 800, letterSpacing: '0.12em', textTransform: 'uppercase'}}>
        {eyebrow}
      </span>
      <h2 style={{color: dark, fontSize: 22, lineHeight: 1.15, margin: '8px 0 0'}}>{title}</h2>
      {children}
    </section>
  )
}

export default function EditorGuide() {
  return (
    <main style={{background: '#f5f7f6', minHeight: '100%', padding: 'clamp(20px, 4vw, 48px)'}}>
      <div style={{margin: '0 auto', maxWidth: 1120}}>
        <header style={{background: dark, borderRadius: 16, color: '#fff', marginBottom: 24, overflow: 'hidden', padding: 'clamp(28px, 5vw, 54px)', position: 'relative'}}>
          <div style={{background: green, height: 8, inset: '0 0 auto', position: 'absolute'}} />
          <span style={{color: '#75df9b', fontSize: 12, fontWeight: 800, letterSpacing: '0.16em', textTransform: 'uppercase'}}>
            Atlas Fuel Content Manager
          </span>
          <h1 style={{fontSize: 'clamp(34px, 5vw, 58px)', lineHeight: 0.95, margin: '14px 0 18px', maxWidth: 720}}>
            Start here. Editing is only three steps.
          </h1>
          <p style={{color: '#d4ddd7', fontSize: 17, lineHeight: 1.6, margin: 0, maxWidth: 720}}>
            Open the correct page, change the field, then press Publish. Use Preview &amp; Edit Website when you want to see the page beside the editor.
          </p>
          <div style={{display: 'flex', flexWrap: 'wrap', gap: 12, marginTop: 26}}>
            <a href="/structure" style={{background: green, color: '#fff', fontWeight: 800, padding: '12px 18px', textDecoration: 'none'}}>Open Website Content</a>
            <a href="/website" style={{border: '1px solid #7d8d83', color: '#fff', fontWeight: 800, padding: '12px 18px', textDecoration: 'none'}}>Preview Website</a>
            <a href="https://atlas-fuel-website.vercel.app/guides/atlas-fuel-sanity-editing-guide.pdf" target="_blank" rel="noreferrer" style={{color: '#9fe3b7', fontWeight: 800, padding: '12px 4px', textDecoration: 'underline'}}>Download PDF Guide</a>
          </div>
        </header>

        <div style={{display: 'grid', gap: 20, gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))'}}>
          <GuideCard eyebrow="Every edit" title="The normal editing workflow">
            <GuideStep number="1" title="Find the page">Open Website Content and select the page name.</GuideStep>
            <GuideStep number="2" title="Open a numbered section">Change text, links, images or list items inside that section.</GuideStep>
            <GuideStep number="3" title="Publish">Press the green Publish button. The website normally updates within a few seconds.</GuideStep>
          </GuideCard>

          <GuideCard eyebrow="Store locator" title="Add or edit a map marker">
            <GuideStep number="1" title="Open Store Locator and Map">It is placed near the top of Website Content.</GuideStep>
            <GuideStep number="2" title="Open section 3">Choose Store Locations and Map Markers, then select a store.</GuideStep>
            <GuideStep number="3" title="Complete the coordinates">Enter latitude and longitude, keep Show Marker on Map enabled, then Publish.</GuideStep>
          </GuideCard>

          <GuideCard eyebrow="Global content" title="Where common items live">
            <GuideStep number="1" title="Header and menu">Website Settings - Header and Mega Menu.</GuideStep>
            <GuideStep number="2" title="Footer and contact details">Website Settings - Footer or Site Details, Logo and Top Bar.</GuideStep>
            <GuideStep number="3" title="Colors and fonts">Website Settings - Website Colors and Fonts.</GuideStep>
          </GuideCard>
        </div>

        <section style={{...cardStyle, marginTop: 20}}>
          <h2 style={{color: dark, fontSize: 22, margin: 0}}>Five rules that prevent mistakes</h2>
          <ol style={{color: '#526158', display: 'grid', gap: 10, lineHeight: 1.6, margin: '18px 0 0', paddingLeft: 22}}>
            <li>Publish is required. Saving a draft does not update the public website.</li>
            <li>Use Preview &amp; Edit Website before publishing a large change.</li>
            <li>Add alternative text when uploading an image.</li>
            <li>Do not delete or duplicate main website pages. They are protected single pages.</li>
            <li>If a field is intentionally blank, the website may use its safe fallback content.</li>
          </ol>
        </section>
      </div>
    </main>
  )
}
