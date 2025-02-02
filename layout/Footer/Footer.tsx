import { FC } from 'react'
import cn from 'classnames'
import { IFooterProps } from './Footer.props'
import styles from './Footer.module.css'
import { format } from 'date-fns'

export const Footer: FC<IFooterProps> = ({ className, ...props }) => {
  return (
    <footer className={cn(styles.footer, className)} {...props}>
      <div>OwlTop © 2020 - {format(new Date(), 'yyyy')} Все права защищены</div>
      <a href="#" target="_blank">
        Пользовательское соглашение
      </a>
      <a href="#" target="_blank">
        Политика конфиденциальности
      </a>
    </footer>
  )
}
