import type { Ref } from 'vue'

export default function (
  containerRef: Ref<HTMLElement | null>,
  menuRef: Ref<HTMLElement | null>
) {
  const showMenu = ref<boolean>(true)
  const x = ref<number>(0)
  const y = ref<number>(0)
  const maxX = ref<number>(0)
  const maxY = ref<number>(0)

  const calcMax = () => ({
    menuHeight: menuRef.value!.getBoundingClientRect().height,
    menuWidth: menuRef.value!.getBoundingClientRect().width
  })
  const handleContextMenu = (e: any) => {
    e.preventDefault()
    e.stopPropagation()
    showMenu.value = true
    if (e.clientX > maxX.value) {
      x.value = maxX.value
    } else {
      x.value = e.clientX
    }
    if (e.clientY > maxY.value) {
      y.value = maxY.value
    } else {
      y.value = e.clientY
    }
  }
  const closeMenu = () => {
    showMenu.value = false
  }
  onMounted(() => {
    const { menuWidth, menuHeight } = calcMax()
    maxX.value = window.innerWidth - menuWidth
    maxY.value = window.innerHeight - menuHeight
    useEventListener(containerRef.value!, 'contextmenu', handleContextMenu)
    useEventListener(window, 'contextmenu', closeMenu, true)
    useEventListener(window, 'click', closeMenu, true)
  })
  return { showMenu, x, y }
}