export const NAV_LINKS = [
  {
    label: 'Services',
    path: '/services',
    children: [
      { label: '3D Scanning', path: '/services/scanning', serviceId: 'scanning' },
      { label: 'Product Design', path: '/services/product-design', serviceId: 'product-design' },
      { label: '3D Printing', path: '/services/printing', serviceId: 'printing' },
      { label: 'Coaching', path: '/services/coaching', serviceId: 'coaching' },
    ],
  },
  { label: 'About', path: '/about' },
  { label: 'Start a Project', path: '/contact', cta: true },
]
