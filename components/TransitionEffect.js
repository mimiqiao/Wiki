import BLOG from '@/blog.config'
import { useGlobal } from '@/lib/global'
import { motion, AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/router'

const variants = {
  in: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.25,
      delay: 0.25
    }
  },
  out: {
    opacity: 0,
    scale: 1,
    y: 40,
    transition: {
      duration: 0.25
    }
  }
}

/*
 * Read the blog post here:
 * https://letsbuildui.dev/articles/animated-page-transitions-in-nextjs
 */
const TransitionEffect = ({ children }) => {
  const { asPath } = useRouter()
  const { onLoading } = useGlobal()

  // 禁用过渡动画
  if (JSON.parse(BLOG.TRANSITION_ANIMATION)) {
    // 使用过渡动画
    return (
    <div className='effect-1'>
        <AnimatePresence
            initial={false}
            mode='wait'
            onExitComplete={() => window.scrollTo(0, 0)}
        >
            <motion.div
                key={asPath}
                variants={variants}
                animate='in'
                initial='out'
                exit='out'
            >
                {children}
            </motion.div>
        </AnimatePresence>
    </div>
    )
  }

  const LoadingCover = <div id='cover-loading' className={`${onLoading ? 'z-50 opacity-50' : '-z-10 opacity-0'} pointer-events-none transition-all duration-300`}>
  <div className='w-full h-screen flex justify-center items-center'>
      <i className="fa-solid fa-spinner text-2xl text-black dark:text-white animate-spin">  </i>
  </div>
</div>

  return <>
  {onLoading ? LoadingCover : children}
</>
}

export default TransitionEffect
