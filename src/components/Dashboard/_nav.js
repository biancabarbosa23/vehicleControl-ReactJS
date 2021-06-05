import React from 'react'
import CIcon from '@coreui/icons-react'

const _nav = [
  {
    _tag: 'CSidebarNavItem',
    name: 'Dashboard',
    to: '/dashboard',
    icon: (
      <i
        className="fa fa-home"
        aria-hidden="true"
        style={{ marginLeft: 8, marginRight: 20, color: 'white' }}
      ></i>
    ),
  },
  {
    _tag: 'CSidebarNavTitle',
    _children: ['Controle'],
  },

  {
    _tag: 'CSidebarNavItem',
    name: 'Veiculos',
    to: '/dashboard/veiculos',
    icon: (
      <i
        className="fa fa-car"
        aria-hidden="true"
        style={{ marginLeft: 8, marginRight: 20, color: 'white' }}
      ></i>
    ),
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Acessos',
    to: '/dashboard/acessos',
    icon: (
      <i
        className="fa fa-book"
        aria-hidden="true"
        style={{ marginLeft: 8, marginRight: 20, color: 'white' }}
      ></i>
    ),
  },
  {
    _tag: 'CSidebarNavDivider',
    className: 'm-2',
  },
]

export default _nav
