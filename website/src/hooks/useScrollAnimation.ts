'use client'

import { useEffect, useRef, useState } from 'react'

interface UseScrollAnimationOptions {
  threshold?: number
  rootMargin?: string
  triggerOnce?: boolean
}

export function useScrollAnimation(options: UseScrollAnimationOptions = {}) {
  const [isVisible, setIsVisible] = useState(false)
  const [hasAnimated, setHasAnimated] = useState(false)
  const elementRef = useRef<HTMLElement>(null)

  const {
    threshold = 0.1,
    rootMargin = '0px',
    triggerOnce = true
  } = options

  useEffect(() => {
    const element = elementRef.current
    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          if (triggerOnce) {
            setHasAnimated(true)
            observer.unobserve(element)
          }
        } else if (!triggerOnce) {
          setIsVisible(false)
        }
      },
      {
        threshold,
        rootMargin
      }
    )

    if (!hasAnimated) {
      observer.observe(element)
    }

    return () => {
      observer.unobserve(element)
    }
  }, [threshold, rootMargin, triggerOnce, hasAnimated])

  return { elementRef, isVisible, hasAnimated }
}

export function useScrollAnimations(count: number, options: UseScrollAnimationOptions = {}) {
  const refs = useRef<(HTMLElement | null)[]>([])
  const [visibleStates, setVisibleStates] = useState<boolean[]>(new Array(count).fill(false))
  const [animatedStates, setAnimatedStates] = useState<boolean[]>(new Array(count).fill(false))

  const {
    threshold = 0.1,
    rootMargin = '0px',
    triggerOnce = true
  } = options

  useEffect(() => {
    const observers: IntersectionObserver[] = []

    refs.current.forEach((element, index) => {
      if (!element || animatedStates[index]) return

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setVisibleStates(prev => {
              const newStates = [...prev]
              newStates[index] = true
              return newStates
            })

            if (triggerOnce) {
              setAnimatedStates(prev => {
                const newStates = [...prev]
                newStates[index] = true
                return newStates
              })
              observer.unobserve(element)
            }
          } else if (!triggerOnce) {
            setVisibleStates(prev => {
              const newStates = [...prev]
              newStates[index] = false
              return newStates
            })
          }
        },
        {
          threshold,
          rootMargin
        }
      )

      observer.observe(element)
      observers.push(observer)
    })

    return () => {
      observers.forEach(observer => {
        refs.current.forEach(element => {
          if (element) observer.unobserve(element)
        })
      })
    }
  }, [count, threshold, rootMargin, triggerOnce, animatedStates])

  const getRef = (index: number) => (el: HTMLElement | null) => {
    refs.current[index] = el
  }

  return { refs: refs.current, visibleStates, animatedStates, getRef }
}
