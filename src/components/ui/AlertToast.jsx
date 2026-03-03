import { useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

export default function AlertToast({
  show,
  setShow,
  message,
  type = "success",
}) {
  useEffect(() => {
    if (!show) return

    const timer = setTimeout(() => {
      setShow(false)
    }, 2500)

    return () => clearTimeout(timer)
  }, [show, setShow])

  const warna =
    type === "success"
      ? "from-green-500 to-emerald-600"
      : "from-red-500 to-rose-600"

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className={`fixed top-6 right-6 px-6 py-3 rounded-2xl text-white shadow-lg bg-linear-to-r ${warna} z-50`}
        >
          {message}
        </motion.div>
      )}
    </AnimatePresence>
  )
}