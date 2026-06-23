import moment from 'moment'
import 'moment/locale/id'

moment.locale('id')

export function formatDate(date) {
  if (!date) return '-'
  return moment(date).format('DD MMMM YYYY, HH:mm')
}

export function formatRelativeDate(date) {
  if (!date) return '-'
  return moment(date).fromNow()
}

export function formatPrice(price) {
  if (price === 0) return 'Gratis'
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0
  }).format(price)
}

export const BADGE_DETAILS = {
  'Benih': { 
    icon: `<svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22V12"></path><path d="M12 12a5 5 0 0 1 5-5h3"></path><path d="M12 15a5 5 0 0 0-5-5H4"></path></svg>`, 
    color: '#9CA3AF', 
    text: 'text-slate-500', 
    bg: 'bg-slate-100 dark:bg-slate-800' 
  },
  'Tunas': { 
    icon: `<svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 22c1.25-3.25 4.75-6 10-6s8.75 2.75 10 6"></path><path d="M12 2v14"></path><path d="M12 6c1.5-1 4-1.5 6-1"></path><path d="M12 10c-1.5-1-4-1.5-6-1"></path></svg>`, 
    color: '#2C7A4D', 
    text: 'text-primary dark:text-primary-light', 
    bg: 'bg-green-50 dark:bg-green-950/20' 
  },
  'Pelepah': { 
    icon: `<svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M13 22V10"></path><path d="M11 22V12"></path><path d="M12 10C8.5 7.5 4.5 7.5 2 9c3.5.5 7.5 1.5 10 1Z"></path><path d="M12 10c3.5-2.5 7.5-2.5 10-1-3.5.5-7.5 1.5-10 1Z"></path><path d="M12 12C9 9.5 5 9.5 3 11c3 .5 7 1.5 9 1Z"></path><path d="M12 12c3-2.5 7-2.5 9-1-3 .5-7 1.5-9 1Z"></path></svg>`, 
    color: '#F59E0B', 
    text: 'text-secondary-hover dark:text-secondary', 
    bg: 'bg-amber-50 dark:bg-amber-950/20' 
  },
  'Mahkota': { 
    icon: `<svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"></path><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"></path><path d="M4 22h16"></path><path d="M10 14.66V17c0 .55-.45 1-1 1H4v2h16v-2h-5c-.55 0-1-.45-1-1v-2.34"></path><path d="M12 2a5 5 0 0 0-5 5v3c0 2.2 1.8 4 4 4h2c2.2 0 4-1.8 4-4V7a5 5 0 0 0-5-5Z"></path></svg>`, 
    color: '#8B5CF6', 
    text: 'text-purple-600 dark:text-purple-400', 
    bg: 'bg-purple-50 dark:bg-purple-950/20' 
  },
  'Raja Sawit': { 
    icon: `<svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 4l3 12h14l3-12-6 7-4-7-4 7-6-7z"></path><path d="M3 20h18"></path></svg>`, 
    color: '#EF4444', 
    text: 'text-red-600 dark:text-red-400', 
    bg: 'bg-red-50 dark:bg-red-950/20' 
  }
}

export function getBadge(name) {
  return BADGE_DETAILS[name] || { 
    icon: `<svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>`, 
    color: '#9CA3AF', 
    text: 'text-gray-500', 
    bg: 'bg-gray-100' 
  }
}

export function getImageUrl(path) {
  if (!path) return '';
  if (path.startsWith('http') || path.startsWith('data:')) return path;
  
  const baseUrl = import.meta.env.VITE_API_URL || (import.meta.env.DEV ? 'http://localhost:3000/api' : '/api');
  const origin = baseUrl.replace(/\/api\/?$/, '');
  
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  return `${origin}${normalizedPath}`;
}

/**
 * Generate an inline SVG data URI avatar from a name/username.
 * Returns a "data:" URI so no external requests are made.
 * @param {string} name - Full name or username
 * @param {number} size - Size in px (default 64)
 * @returns {string} data: URI of an SVG avatar
 */
export function getDefaultAvatar(name = '?', size = 64) {
  const colors = [
    ['#2C7A4D', '#1a4d2e'], // primary green
    ['#1E3A5F', '#0f2040'], // accent blue
    ['#7c3aed', '#5b21b6'], // purple
    ['#b45309', '#92400e'], // amber
    ['#0e7490', '#0c4a6e'], // teal
    ['#be185d', '#9d174d'], // pink
    ['#15803d', '#14532d'], // emerald
    ['#c2410c', '#9a3412'], // orange
  ]

  const initials = (name || '?')
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map(w => w[0].toUpperCase())
    .join('')
    .slice(0, 2) || '?'

  // Pick color based on sum of char codes for consistency
  const charSum = (name || '?').split('').reduce((acc, c) => acc + c.charCodeAt(0), 0)
  const [bg, bg2] = colors[charSum % colors.length]

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
    <defs>
      <linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="${bg}"/>
        <stop offset="100%" stop-color="${bg2}"/>
      </linearGradient>
    </defs>
    <rect width="${size}" height="${size}" rx="${size / 2}" fill="url(#g)"/>
    <text x="50%" y="50%" text-anchor="middle" dominant-baseline="central"
      font-family="Inter, Roboto, sans-serif"
      font-size="${size * 0.38}"
      font-weight="700"
      fill="#ffffff"
      letter-spacing="1">
      ${initials}
    </text>
  </svg>`

  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`
}
