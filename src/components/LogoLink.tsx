import { FC } from 'react'
import IconButton from '@mui/material/IconButton'

import { Minifig } from 'types/minifigs'

import bricklinkLogo from 'assets/bricklink.png'
import bricksetLogo from 'assets/brickset.png'

// TODO: Add set support when adding Set page
type LogoLinkProps = {
  id: Minifig['id'] // | Set['id']
  target: 'bricklink' | 'brickset'
  variant: 'minifig' // | 'set'
}

const logoLinkPropsMap: Record<
  LogoLinkProps['target'],
  { url: (id: LogoLinkProps['id'], isMinifig: boolean) => string; src: string; alt: string }
> = {
  bricklink: {
    alt: 'bricklink-logo',
    src: bricklinkLogo,
    url: (id, isMinifig) =>
      `https://www.bricklink.com/v2/catalog/catalogitem.page?${isMinifig ? 'M' : 'S'}=${id}`,
  },
  brickset: {
    alt: 'brickset-logo',
    src: bricksetLogo,
    url: (id, isMinifig) => `https://brickset.com/${isMinifig ? 'minifigs' : 'sets'}/${id}`,
  },
}

export const LogoLink: FC<LogoLinkProps> = ({ target, variant, id }) => {
  const { url, ...rest } = logoLinkPropsMap[target]
  return (
    <IconButton
      href={url(id, variant === 'minifig')}
      sx={{
        '& img': {
          height: '2rem',
          width: '2rem',
        },
      }}
    >
      <img {...rest} />
    </IconButton>
  )
}

export default LogoLink
