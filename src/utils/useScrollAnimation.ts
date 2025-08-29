'use client'

import { useEffect } from 'react'

export const useScrollAnimation = () => {
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate')
        }
      })
    }, observerOptions)

    // Select all elements with scroll animation classes
    const animatedElements = document.querySelectorAll(
      '.scroll-fade-in-up, .scroll-fade-in-left, .scroll-fade-in-right, .scroll-scale-in, .scroll-slide-in-up'
    )

    animatedElements.forEach((element) => {
      observer.observe(element)
    })

    return () => {
      animatedElements.forEach((element) => {
        observer.unobserve(element)
      })
    }
  }, [])
}

export default useScrollAnimation
