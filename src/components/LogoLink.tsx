import { FC } from 'react'
import { IconButton, Tooltip } from '@mui/material'

import { Minifig } from 'types/minifigs'
import { Set } from 'types/sets'

import bricklinkLogo from 'assets/bricklink.png'
import bricksetLogo from 'assets/brickset.png'

// TODO: Add set support when adding Set page
type LogoLinkProps = {
  id: Minifig['id'] | Set['id']
  target: 'bricklink' | 'brickset'
  variant: 'minifig' | 'set'
}

const logoLinkPropsMap: Record<
  LogoLinkProps['target'],
  {
    url: (id: LogoLinkProps['id'], isMinifig: boolean) => string
    tooltip: (id: LogoLinkProps['id'], isMinifig: boolean) => string
    src: string
    alt: string
  }
> = {
  bricklink: {
    alt: 'bricklink-logo',
    src: bricklinkLogo,
    url: (id, isMinifig) =>
      `https://www.bricklink.com/v2/catalog/catalogitem.page?${isMinifig ? 'M' : 'S'}=${id}`,
    tooltip: (id, isMinifig) =>
      `Link to the bricklink page of the ${isMinifig ? 'minifig' : 'set'} ${id}`,
  },
  brickset: {
    alt: 'brickset-logo',
    src: bricksetLogo,
    url: (id, isMinifig) => `https://brickset.com/${isMinifig ? 'minifigs' : 'sets'}/${id}`,
    tooltip: (id, isMinifig) =>
      `Link to the brickset page of the ${isMinifig ? 'minifig' : 'set'} ${id}`,
  },
}

export const LogoLink: FC<LogoLinkProps> = ({ target, variant, id }) => {
  const { url, tooltip, ...rest } = logoLinkPropsMap[target]
  const isMinifig = variant === 'minifig'
  return (
    <Tooltip enterDelay={500} enterNextDelay={500} title={tooltip(id, isMinifig)}>
      <IconButton
        href={url(id, isMinifig)}
        sx={{
          '& img': {
            height: '2rem',
            width: '2rem',
          },
        }}
      >
        <img {...rest} />
      </IconButton>
    </Tooltip>
  )
}

export default LogoLink
