export const NAV_LINKS = [
  { label: 'Home', path: '/' },
  {
    label: 'Services',
    path: '/services',
    children: [
      { label: '3D Scanning', path: '/services/scanning', serviceId: 'scanning' },
      { label: 'Reverse Engineering', path: '/services/reverse', serviceId: 'reverse' },
      { label: '3D Printing', path: '/services/printing', serviceId: 'printing' },
      { label: 'Coaching', path: '/services/coaching', serviceId: 'coaching' },
    ],
  },
  { label: 'YouTube', path: '/youtube' },
  { label: 'Portfolio', path: '/portfolio' },
  { label: 'About', path: '/about' },
  { label: 'Get a Quote', path: '/contact' },
]
