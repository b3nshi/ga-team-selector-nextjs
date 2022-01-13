import React from 'react'
import Link from 'next/link'

const styles = {
  content: {
    padding: '4px 32px 32px 32px',
    background: '#eeeeee',
    display: 'inline-block',
  },
  linkAnchor: {
    color: 'teal',
    display: 'block',
    lineHeight: '160%',
  },
}

const MenuLinks = () => (
  <div style={styles.content}>
    <h4>Examples</h4>
    <div>
      <Link href="/static-auth-required-loader">
        <a style={styles.linkAnchor}>
          Example: static + loader + data fetching with ID token
        </a>
      </Link>
      <Link href="/auth">
        <a style={styles.linkAnchor}>Login page: static</a>
      </Link>
    </div>
  </div>
)

MenuLinks.displayName = 'MenuLinks'

export default MenuLinks