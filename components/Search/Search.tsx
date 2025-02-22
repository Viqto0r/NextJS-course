import { FC, KeyboardEvent, useState } from 'react'
import cn from 'classnames'
import { ISearchProps } from './Search.props'
import styles from './Search.module.css'
import { Input } from '../Input/Input'
import { Button } from '../Button/Button'
import GlassIcon from './glass.svg'
import { useRouter } from 'next/router'

export const Search: FC<ISearchProps> = ({ className, ...restProps }) => {
  const [search, setSearch] = useState('')
  const router = useRouter()

  const goToSearch = () => {
    router.push({
      pathname: 'search',
      query: {
        q: search,
      },
    })
  }

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Enter') {
      goToSearch()
    }
  }

  return (
    <div className={cn(styles.search, className)} {...restProps}>
      <Input
        className={styles.input}
        placeholder="Поиск..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <Button
        className={styles.button}
        appearance="primary"
        onClick={goToSearch}
        aria-label="Искать по сайту"
      >
        <GlassIcon />
      </Button>
    </div>
  )
}
