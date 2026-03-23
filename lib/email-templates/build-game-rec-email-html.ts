/**
 * Table-based HTML for Customer.io / email clients.
 * Matches lab preview: flat header + sidebar brandmark, lime CTA, placeholder "Your go-to".
 * Pass `assetBaseUrl` (e.g. window.location.origin) for image src; replace with CDN URLs in production.
 */
export type GameRecEmailExportTheme = 'light' | 'dark'

const FF =
  "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif"

export function buildGameRecEmailHtml(options: {
  assetBaseUrl: string
  theme: GameRecEmailExportTheme
}): string {
  const base = options.assetBaseUrl.replace(/\/$/, '')
  const markSrc = `${base}/cloudbet-sidebar-mark.png`
  const footerLogoSrc = `${base}/cloudbet-logo.png`
  const isLight = options.theme === 'light'

  const cardBg = isLight ? '#FFFFFF' : '#111111'
  const pageBg = isLight ? '#F0F0F3' : '#0A0A0A'
  const headerBg = cardBg
  const text = isLight ? '#111111' : '#FFFFFF'
  const muted = isLight ? '#6B7280' : '#AAAAAA'
  const recBg = isLight ? '#FAFAFA' : '#1A1A1A'
  const recBorder = isLight ? '#EEEEEE' : '#2A2A2A'
  const tierBg = isLight ? '#F3EDFF' : '#2A1A3E'
  const tierFg = isLight ? '#7B3FBF' : '#C49BFF'
  const statsBorder = isLight ? '#E5E7EB' : '#2A2A2A'
  const statsBarBg = isLight ? '#FFFFFF' : '#1A1A1A'
  const statLabel = isLight ? '#999999' : '#888888'
  const placeholderBorder = isLight ? '#E5E7EB' : '#2A2A2A'
  const placeholderBg = isLight ? '#F9FAFB' : '#1A1A1A'
  const placeholderText = isLight ? '#9CA3AF' : '#666666'
  const footerMuted = isLight ? '#9CA3AF' : '#666666'
  const footerCopy = isLight ? '#CCCCCC' : '#555555'

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="color-scheme" content="light dark">
  <title>Games picked for you</title>
  <!--[if mso]>
  <style type="text/css">body, table, td { font-family: Arial, sans-serif !important; }</style>
  <![endif]-->
  <style>
    :root { color-scheme: light dark; }
    @media only screen and (max-width: 600px) {
      .email-outer { padding: 12px 8px !important; }
      .container { width: 100% !important; max-width: 100% !important; }
      .main-card { border-radius: 0 !important; }
      .hero-title { font-size: 26px !important; line-height: 32px !important; }
      .rec-desc { word-break: break-word; overflow-wrap: break-word; }
      .stats-bar { border-radius: 0 !important; }
      .stats-cell {
        display: block !important;
        width: 100% !important;
        max-width: 100% !important;
        box-sizing: border-box !important;
        padding: 16px 20px !important;
        border-right: none !important;
        border-bottom: 1px solid ${statsBorder} !important;
      }
      .stats-cell:last-child { border-bottom: none !important; }
      .cta-shell { width: 100% !important; }
      .cta-cell {
        display: block !important;
        width: 100% !important;
        max-width: 100% !important;
        box-sizing: border-box !important;
      }
      .cta-cell a { display: block !important; text-align: center !important; }
    }
  </style>
</head>
<body style="margin:0;padding:0;-webkit-text-size-adjust:none;">
<!-- Customer.io: replace image URLs with hosted assets; set unsubscribe to your campaign link or Liquid tag. -->
<span style="display:none;max-height:0;overflow:hidden;">Sweet Bonanza fan? We found your next obsession.</span>
<table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" class="body-wrapper" style="background-color:${pageBg};margin:0;padding:0;">
  <tr>
    <td align="center" class="email-outer" style="padding:24px 16px;">
      <table role="presentation" width="600" cellspacing="0" cellpadding="0" border="0" class="main-card container" style="background-color:${cardBg};border-radius:16px;overflow:hidden;max-width:600px;width:100%;">
        <tr>
          <td style="background-color:${headerBg};padding:12px 12px;text-align:left;">
            <a href="https://www.cloudbet.com/?utm_source=email&utm_medium=casino&utm_campaign=game-recs">
              <img src="${markSrc}" alt="Cloudbet" width="55" height="33" style="display:block;width:55px;height:33px;border:0;">
            </a>
          </td>
        </tr>
        <tr>
          <td class="wrapper content-section" style="padding:32px 24px 0 24px;background-color:${cardBg};">
            <table role="presentation" cellspacing="0" cellpadding="0" border="0" style="margin-bottom:16px;">
              <tr>
                <td class="tier-badge" style="background-color:${tierBg};color:${tierFg};font-family:${FF};font-size:11px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;padding:5px 14px;border-radius:20px;">PLATINUM</td>
              </tr>
            </table>
            <h1 class="hero-title" style="margin:0 0 8px 0;font-family:${FF};font-size:30px;font-weight:800;line-height:36px;color:${text};letter-spacing:-0.5px;">Because you play Sweet Bonanza</h1>
            <p class="hero-sub" style="margin:0 0 28px 0;font-family:${FF};font-size:16px;line-height:24px;color:${muted};">You like Pragmatic Play. Here&rsquo;s what else you should be playing.</p>
          </td>
        </tr>
        <tr>
          <td class="wrapper content-section" style="padding:0 12px 8px 12px;background-color:${cardBg};">
            ${recBlock({
              ff: FF,
              isLight,
              recBg,
              recBorder,
              tierBg,
              tierFg,
              text,
              muted: isLight ? '#6B7280' : '#999999',
              tag: true,
              title: 'Sugar Rush 1000',
              desc: 'Same Pragmatic Play engine as your go-to, but with a multiplier grid that stacks up to 1,000x. High volatility, candy theme, massive ceiling.',
              href: 'https://www.cloudbet.com/en/casino/play/sugar-rush-1000?utm_source=email&utm_medium=casino&utm_campaign=game-recs',
            })}
            ${recBlock({
              ff: FF,
              isLight,
              recBg,
              recBorder,
              tierBg,
              tierFg,
              text,
              muted: isLight ? '#6B7280' : '#999999',
              tag: false,
              title: 'Fruit Party 2',
              desc: 'Cluster pays with random multipliers on every spin. If you like Sweet Bonanza&rsquo;s tumble mechanic, this is its wilder cousin. 96.53% RTP.',
              href: 'https://www.cloudbet.com/en/casino/play/fruit-party-2?utm_source=email&utm_medium=casino&utm_campaign=game-recs',
            })}
            ${recBlock({
              ff: FF,
              isLight,
              recBg,
              recBorder,
              tierBg,
              tierFg,
              text,
              muted: isLight ? '#6B7280' : '#999999',
              tag: false,
              title: 'Gates of Olympus 1000',
              desc: 'Different theme, same DNA. Pragmatic&rsquo;s scatter-pays system with multiplier orbs that can hit 500x in a single free spin round.',
              href: 'https://www.cloudbet.com/en/casino/play/gates-of-olympus-1000?utm_source=email&utm_medium=casino&utm_campaign=game-recs',
            })}
          </td>
        </tr>
        <tr>
          <td class="wrapper content-section" style="padding:20px 32px 8px 32px;background-color:${cardBg};">
            <p class="section-title" style="margin:0 0 12px 0;font-family:${FF};font-size:11px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:#7B3FBF;">Your go-to</p>
            <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
              <tr>
                <td style="border-radius:12px;border:2px dashed ${placeholderBorder};background-color:${placeholderBg};height:200px;text-align:center;vertical-align:middle;">
                  <p style="margin:0;font-family:${FF};font-size:14px;font-weight:600;color:${placeholderText};">Game image</p>
                  <p style="margin:4px 0 0 0;font-family:${FF};font-size:12px;color:${isLight ? '#D1D5DB' : '#555555'};">Placeholder</p>
                </td>
              </tr>
            </table>
          </td>
        </tr>
        <tr>
          <td class="wrapper content-section" style="padding:24px 32px;background-color:${cardBg};">
            <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" class="stats-bar" style="border:1px solid ${statsBorder};border-radius:12px;overflow:hidden;background-color:${statsBarBg};">
              <tr>
                <td class="stats-cell" align="center" style="padding:16px 20px;border-right:1px solid ${statsBorder};width:33%;">
                  <p class="stat-label" style="margin:0 0 4px 0;font-family:${FF};font-size:10px;font-weight:600;letter-spacing:1px;text-transform:uppercase;color:${statLabel};">Biggest Win</p>
                  <p class="stat-value" style="margin:0;font-family:${FF};font-size:20px;font-weight:800;color:${text};">&euro;2,450</p>
                </td>
                <td class="stats-cell" align="center" style="padding:16px 20px;border-right:1px solid ${statsBorder};width:33%;">
                  <p class="stat-label" style="margin:0 0 4px 0;font-family:${FF};font-size:10px;font-weight:600;letter-spacing:1px;text-transform:uppercase;color:${statLabel};">Top Studio</p>
                  <p class="stat-value" style="margin:0;font-family:${FF};font-size:15px;font-weight:700;color:${text};">Pragmatic Play</p>
                </td>
                <td class="stats-cell" align="center" style="padding:16px 20px;width:33%;">
                  <p class="stat-label" style="margin:0 0 4px 0;font-family:${FF};font-size:10px;font-weight:600;letter-spacing:1px;text-transform:uppercase;color:${statLabel};">Status</p>
                  <p class="stat-value" style="margin:0;font-family:${FF};font-size:15px;font-weight:700;color:#7B3FBF;">PLATINUM</p>
                </td>
              </tr>
            </table>
          </td>
        </tr>
        <tr>
          <td class="wrapper content-section" style="padding:0 32px 24px 32px;background-color:${cardBg};">
            <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background:linear-gradient(135deg, #7B3FBF 0%, #4A1A8A 100%);border-radius:12px;">
              <tr>
                <td style="padding:20px 24px;">
                  <p style="margin:0;font-family:${FF};font-size:14px;font-weight:600;color:#FFFFFF;">82% to Diamond &mdash; every spin counts.</p>
                </td>
              </tr>
            </table>
          </td>
        </tr>
        <tr>
          <td class="wrapper content-section" style="padding:32px 12px 32px 12px;background-color:${cardBg};" align="center">
            <table role="presentation" class="cta-shell" cellspacing="0" cellpadding="0" border="0">
              <tr>
                <td class="cta-cell" style="background-color:#DFFD51;border-radius:9999px;padding:14px 40px;">
                  <a href="https://www.cloudbet.com/en/casino?utm_source=email&utm_medium=casino&utm_campaign=game-recs" style="font-family:${FF};font-size:15px;font-weight:700;color:#000000;text-decoration:none;display:inline-block;">Explore Casino</a>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
      <table role="presentation" width="600" cellspacing="0" cellpadding="0" border="0" class="container" style="max-width:600px;width:100%;">
        <tr>
          <td style="padding:24px 12px;text-align:center;">
            <a href="https://www.cloudbet.com/?utm_source=email&utm_medium=casino&utm_campaign=game-recs">
              <img src="${footerLogoSrc}" alt="Cloudbet" width="100" style="display:inline-block;height:16px;width:auto;max-width:180px;border:0;">
            </a>
            <p class="footer-text" style="margin:12px 0 0 0;font-family:${FF};font-size:12px;line-height:18px;color:${footerMuted};">
              You&rsquo;re getting this because you play casino games on Cloudbet.<br>
              <a href="#unsub" style="color:${footerMuted};text-decoration:underline;">Unsubscribe</a> &nbsp;|&nbsp; <a href="#prefs" style="color:${footerMuted};text-decoration:underline;">Preferences</a>
            </p>
            <p class="footer-text" style="margin:8px 0 0 0;font-family:${FF};font-size:11px;color:${footerCopy};">&copy; 2026 Cloudbet. Play responsibly. 18+</p>
          </td>
        </tr>
      </table>
    </td>
  </tr>
</table>
</body>
</html>`
}

function recBlock(p: {
  ff: string
  isLight: boolean
  recBg: string
  recBorder: string
  tierBg: string
  tierFg: string
  text: string
  muted: string
  tag: boolean
  title: string
  desc: string
  href: string
}): string {
  const cardBorder = p.isLight
    ? `border:1px solid ${p.recBorder}`
    : 'border:0'
  const tagHtml = p.tag
    ? `<table role="presentation" cellspacing="0" cellpadding="0" border="0" style="margin-bottom:8px;">
          <tr>
            <td class="rec-tag" style="background-color:${p.tierBg};color:${p.tierFg};font-family:${p.ff};font-size:10px;font-weight:700;letter-spacing:1px;text-transform:uppercase;padding:3px 10px;border-radius:4px;">Top pick</td>
          </tr>
        </table>`
    : ''
  return `<table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" class="rec-card" style="background-color:${p.recBg};${cardBorder};border-radius:12px;overflow:hidden;margin-bottom:12px;">
  <tr>
    <td style="padding:24px;">
      ${tagHtml}
      <p class="rec-title" style="margin:0 0 6px 0;font-family:${p.ff};font-size:18px;font-weight:700;color:${p.text};">${p.title}</p>
      <p class="rec-desc" style="margin:0 0 12px 0;font-family:${p.ff};font-size:14px;line-height:20px;color:${p.muted};">${p.desc}</p>
      <a href="${p.href}" style="font-family:${p.ff};font-size:13px;font-weight:700;color:#7B3FBF;text-decoration:none;">Play now &rarr;</a>
    </td>
  </tr>
</table>`
}
