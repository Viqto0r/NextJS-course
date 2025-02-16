import { FC, useEffect } from 'react'
import styles from './Up.module.css'
import UpIcon from './up.svg'
import { useScrollY } from '../../hooks/useScrollY'
import { motion, useAnimation } from 'framer-motion'

export const Up: FC = () => {
  const scrollY = useScrollY()
  const controls = useAnimation()

  useEffect(() => {
    controls.start({ opacity: scrollY / document.body.scrollHeight })
  }, [scrollY, controls])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <motion.button
      animate={controls}
      initial={{ opacity: 0 }}
      className={styles.up}
      onClick={scrollToTop}
    >
      <UpIcon />
    </motion.button>
  )
}
