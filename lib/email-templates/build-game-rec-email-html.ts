/**
 * Table-based HTML for Customer.io / email clients.
 * Matches lab preview: flat header + horizontal wordmark, lime CTA, placeholder "Your go-to".
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
  const markSrc = `${base}/cloudbet-logo-wordmark.png`
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
  const statsDivider = isLight ? '#E5E7EB' : '#363636'
  const statLabel = isLight ? '#6B7280' : '#9CA3AF'
  const placeholderBg = isLight ? '#F3F4F6' : '#252525'
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
      .rec-title { font-size: 16px !important; line-height: 22px !important; }
      .stat-value-lg { font-size: 18px !important; }
      .stat-value-md { font-size: 14px !important; }
      .stat-label { font-size: 8px !important; }
      .rec-desc { word-break: break-word; overflow-wrap: break-word; }
      .stats-bar { border-radius: 0 !important; border: none !important; background-color: transparent !important; }
      .stats-cell {
        display: block !important;
        width: 100% !important;
        max-width: 100% !important;
        box-sizing: border-box !important;
        padding: 16px 20px !important;
        border-right: none !important;
        border-bottom: 1px solid ${statsDivider} !important;
      }
      .stats-cell:last-child { border-bottom: none !important; }
      .loyalty-banner-text {
        display: block !important;
        width: 100% !important;
        padding-bottom: 16px !important;
      }
      .loyalty-banner-cta {
        display: block !important;
        width: 100% !important;
        text-align: center !important;
        padding-left: 0 !important;
        white-space: normal !important;
      }
      .loyalty-banner-cta a {
        display: block !important;
        width: 100% !important;
        text-align: center !important;
        box-sizing: border-box !important;
      }
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
          <td style="background-color:${headerBg};padding:12px 12px;">
            <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
              <tr>
                <td align="left" valign="middle" style="padding:0;">
                  <a href="https://www.cloudbet.com/?utm_source=email&utm_medium=casino&utm_campaign=game-recs">
                    <img src="${markSrc}" alt="Cloudbet" width="188" height="16" style="display:block;width:188px;height:16px;max-width:200px;border:0;">
                  </a>
                </td>
                <td align="right" valign="middle" style="padding:0;">
                  <span class="tier-badge" style="display:inline-block;background-color:${tierBg};color:${tierFg};font-family:${FF};font-size:11px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;padding:5px 14px;border-radius:20px;">PLATINUM</span>
                </td>
              </tr>
            </table>
          </td>
        </tr>
        <tr>
          <td class="wrapper content-section" style="padding:32px 24px 0 24px;background-color:${cardBg};">
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
              text,
              muted: isLight ? '#6B7280' : '#999999',
              title: 'Sugar Rush 1000',
              desc: 'Same Pragmatic Play engine as your go-to, but with a multiplier grid that stacks up to 1,000x.',
              href: 'https://www.cloudbet.com/en/casino/play/sugar-rush-1000?utm_source=email&utm_medium=casino&utm_campaign=game-recs',
              topPick: true,
            })}
            ${recBlock({
              ff: FF,
              isLight,
              recBg,
              recBorder,
              text,
              muted: isLight ? '#6B7280' : '#999999',
              title: 'Fruit Party 2',
              desc: 'Cluster pays with random multipliers on every spin. If you like Sweet Bonanza&rsquo;s tumble mechanic, this is its wilder cousin. 96.53% RTP.',
              href: 'https://www.cloudbet.com/en/casino/play/fruit-party-2?utm_source=email&utm_medium=casino&utm_campaign=game-recs',
            })}
            ${recBlock({
              ff: FF,
              isLight,
              recBg,
              recBorder,
              text,
              muted: isLight ? '#6B7280' : '#999999',
              title: 'Gates of Olympus 1000',
              desc: 'Different theme, same DNA. Pragmatic&rsquo;s scatter-pays system with multiplier orbs that can hit 500x in a single free spin round.',
              href: 'https://www.cloudbet.com/en/casino/play/gates-of-olympus-1000?utm_source=email&utm_medium=casino&utm_campaign=game-recs',
            })}
          </td>
        </tr>
        <tr>
          <td class="wrapper content-section" style="padding:20px 12px 20px 12px;background-color:${cardBg};">
            <p class="section-title" style="margin:0 0 12px 0;font-family:${FF};font-size:11px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:${isLight ? '#7B3FBF' : '#C49BFF'};">Your go-to</p>
            <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
              <tr>
                <td style="border-radius:12px;border:none;background-color:${placeholderBg};height:200px;text-align:center;vertical-align:middle;">
                  <p style="margin:0;font-family:${FF};font-size:14px;font-weight:600;color:${placeholderText};">Game image</p>
                  <p style="margin:4px 0 0 0;font-family:${FF};font-size:12px;color:${isLight ? '#D1D5DB' : '#555555'};">Placeholder</p>
                </td>
              </tr>
            </table>
          </td>
        </tr>
        <tr>
          <td class="wrapper content-section" style="padding:8px 12px 24px 12px;background-color:${cardBg};">
            <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" class="stats-bar" style="border:none;border-radius:0;background-color:transparent;">
              <tr>
                <td class="stats-cell" align="center" style="padding:16px 16px;border-right:1px solid ${statsDivider};width:33%;">
                  <p class="stat-label" style="margin:0 0 8px 0;font-family:${FF};font-size:9px;font-weight:700;letter-spacing:0.14em;text-transform:uppercase;color:${statLabel};">Biggest Win</p>
                  <p class="stat-value stat-value-lg" style="margin:0;font-family:${FF};font-size:20px;font-weight:800;line-height:1.1;color:${text};">&euro;2,450</p>
                </td>
                <td class="stats-cell" align="center" style="padding:16px 16px;border-right:1px solid ${statsDivider};width:33%;">
                  <p class="stat-label" style="margin:0 0 8px 0;font-family:${FF};font-size:9px;font-weight:700;letter-spacing:0.14em;text-transform:uppercase;color:${statLabel};">Top Studio</p>
                  <p class="stat-value stat-value-md" style="margin:0;font-family:${FF};font-size:16px;font-weight:700;line-height:1.2;color:${text};">Pragmatic Play</p>
                </td>
                <td class="stats-cell" align="center" style="padding:16px 16px;width:33%;">
                  <p class="stat-label" style="margin:0 0 8px 0;font-family:${FF};font-size:9px;font-weight:700;letter-spacing:0.14em;text-transform:uppercase;color:${statLabel};">Status</p>
                  <p class="stat-value stat-value-md" style="margin:0;font-family:${FF};font-size:16px;font-weight:700;line-height:1.2;color:#7B3FBF;">PLATINUM</p>
                </td>
              </tr>
            </table>
          </td>
        </tr>
        <tr>
          <td class="wrapper content-section" style="padding:0 12px 32px 12px;background-color:${cardBg};">
            <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color:#7B3FBF;border-radius:20px;">
              <tr>
                <td style="padding:24px;">
                  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                    <tr>
                      <td valign="middle" class="loyalty-banner-text" style="font-family:${FF};font-size:14px;font-weight:500;line-height:1.45;color:#FFFFFF;">
                        82% to Diamond &mdash; every spin counts.
                      </td>
                      <td valign="middle" align="right" class="loyalty-banner-cta" style="padding-left:16px;white-space:nowrap;">
                        <a href="https://www.cloudbet.com/en/casino?utm_source=email&utm_medium=casino&utm_campaign=game-recs" style="display:inline-block;height:40px;line-height:40px;box-sizing:border-box;background-color:#DFFD51;color:#000000;font-family:${FF};font-size:14px;font-weight:700;text-decoration:none;padding:0 24px;border-radius:9999px;">Explore Casino</a>
                      </td>
                    </tr>
                  </table>
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
  text: string
  muted: string
  title: string
  desc: string
  href: string
  topPick?: boolean
}): string {
  const darkCard = !p.isLight
  const outerBg = darkCard ? '#1A1A1A' : p.recBg
  const outerBorder = darkCard ? 'none' : `1px solid ${p.recBorder}`
  const thumbBg = darkCard ? '#252525' : '#E5E7EB'
  const descColor = darkCard ? '#9CA3AF' : p.muted
  const linkColor = darkCard ? '#C4B5FD' : '#7B3FBF'
  const titleColor = darkCard ? '#DFE0E1' : p.text
  const topPickBg = darkCard ? '#2A1A3E' : '#EDE9F7'
  const topPickFg = darkCard ? '#C49BFF' : '#5B3D7A'
  const topPickRow = p.topPick
    ? `<tr>
          <td colspan="2" align="right" valign="top" style="padding:0 0 4px 0;">
            <span style="display:inline-block;background-color:${topPickBg};color:${topPickFg};font-family:${p.ff};font-size:9px;font-weight:700;letter-spacing:1.2px;text-transform:uppercase;padding:3px 9px;border-radius:9999px;">TOP PICK</span>
          </td>
        </tr>`
    : ''
  return `<table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" class="rec-card" style="margin-bottom:16px;border-collapse:separate;border-spacing:0;">
  <tr>
    <td style="background-color:${outerBg};border-radius:12px;padding:12px;border:${outerBorder};">
      <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
        ${topPickRow}
        <tr>
          <td width="112" valign="top" style="width:112px;padding:0;vertical-align:top;">
            <table role="presentation" width="112" cellspacing="0" cellpadding="0" border="0" style="width:112px;min-height:112px;height:100%;background-color:${thumbBg};border-radius:14px;">
              <tr><td style="font-size:0;line-height:0;">&nbsp;</td></tr>
            </table>
          </td>
          <td valign="top" style="padding:0 0 0 16px;">
            <p class="rec-title" style="margin:0;font-family:${p.ff};font-size:18px;font-weight:800;line-height:1.25;letter-spacing:-0.02em;color:${titleColor};">${p.title}</p>
            <p class="rec-desc" style="margin:4px 0 0 0;font-family:${p.ff};font-size:13px;line-height:1.45;font-weight:400;color:${descColor};">${p.desc}</p>
            <a href="${p.href}" style="display:inline-block;margin-top:12px;font-family:${p.ff};font-size:14px;font-weight:500;color:${linkColor};text-decoration:none;">Play now &rarr;</a>
          </td>
        </tr>
      </table>
    </td>
  </tr>
</table>`
}
