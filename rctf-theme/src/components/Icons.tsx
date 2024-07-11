import React from "react"

const icon_style = {
  height: "1em",
  width: "auto",
  display: "inline"
}

type IconProps = React.SVGAttributes<SVGElement>;

export function Arrow(style: React.CSSProperties) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16" style={{...icon_style, ...style}}>
      <polygon stroke="none" points="16 13.2 6.8 4 11 4 11 0 4 0 0 0 0 4 0 11 4 11 4 6.8 13.2 16 16 13.2"/>
    </svg>
  )
}

export function Circle(style: React.CSSProperties) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16" style={{...icon_style, ...style}}>
      <circle r={6} cx={8} cy={8} />
    </svg>
  )
}

export function Discord(style: React.CSSProperties) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16" style={{...icon_style, ...style}}>
      <path d="M13.545 2.907a13.2 13.2 0 0 0-3.257-1.011.05.05 0 0 0-.052.025c-.141.25-.297.577-.406.833a12.2 12.2 0 0 0-3.658 0 8 8 0 0 0-.412-.833.05.05 0 0 0-.052-.025c-1.125.194-2.22.534-3.257 1.011a.04.04 0 0 0-.021.018C.356 6.024-.213 9.047.066 12.032q.003.022.021.037a13.3 13.3 0 0 0 3.995 2.02.05.05 0 0 0 .056-.019q.463-.63.818-1.329a.05.05 0 0 0-.01-.059l-.018-.011a9 9 0 0 1-1.248-.595.05.05 0 0 1-.02-.066l.015-.019q.127-.095.248-.195a.05.05 0 0 1 .051-.007c2.619 1.196 5.454 1.196 8.041 0a.05.05 0 0 1 .053.007q.121.1.248.195a.05.05 0 0 1-.004.085 8 8 0 0 1-1.249.594.05.05 0 0 0-.03.03.05.05 0 0 0 .003.041c.24.465.515.909.817 1.329a.05.05 0 0 0 .056.019 13.2 13.2 0 0 0 4.001-2.02.05.05 0 0 0 .021-.037c.334-3.451-.559-6.449-2.366-9.106a.03.03 0 0 0-.02-.019m-8.198 7.307c-.789 0-1.438-.724-1.438-1.612s.637-1.613 1.438-1.613c.807 0 1.45.73 1.438 1.613 0 .888-.637 1.612-1.438 1.612m5.316 0c-.788 0-1.438-.724-1.438-1.612s.637-1.613 1.438-1.613c.807 0 1.451.73 1.438 1.613 0 .888-.631 1.612-1.438 1.612"/>
    </svg>
  )
}

export function FluentClock(style: React.CSSProperties) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" style={{...icon_style, ...style}}>
      <path d="M15.25 13.5h-4a.75.75 0 0 1-.75-.75v-6a.75.75 0 0 1 1.5 0V12h3.25a.75.75 0 0 1 0 1.5ZM12 2C6.478 2 2 6.478 2 12s4.478 10 10 10 10-4.478 10-10S17.522 2 12 2Z"/>
    </svg>
  )
}

export function FluentDataLine(style: React.CSSProperties) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" style={{...icon_style, ...style}}>
      <path d="M16 6a3 3 0 1 1 2.524 2.962l-2.038 3.358a3 3 0 0 1-4.749 3.65l-3.741 1.87a3 3 0 1 1-.461-1.446l3.531-1.765a3 3 0 0 1 4.275-3.313l1.798-2.963A2.995 2.995 0 0 1 16 6Z"/>
    </svg>
  )
}

export function FluentFlag(style: React.CSSProperties) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" style={{...icon_style, ...style}}>
      <path d="M3 3.747a.75.75 0 0 1 .75-.75h16.504a.75.75 0 0 1 .6 1.2L16.69 9.748l4.164 5.552a.75.75 0 0 1-.6 1.2H4.5v4.749a.75.75 0 0 1-.648.743L3.75 22a.75.75 0 0 1-.743-.648L3 21.249V3.747Z"/>
    </svg>
  )
}

export function FluentGrid(style: React.CSSProperties) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" style={{...icon_style, ...style}}>
      <path d="M8.75 13A2.25 2.25 0 0 1 11 15.25v3.5A2.25 2.25 0 0 1 8.75 21h-3.5A2.25 2.25 0 0 1 3 18.75v-3.5A2.25 2.25 0 0 1 5.25 13h3.5Zm10 0A2.25 2.25 0 0 1 21 15.25v3.5A2.25 2.25 0 0 1 18.75 21h-3.5A2.25 2.25 0 0 1 13 18.75v-3.5A2.25 2.25 0 0 1 15.25 13h3.5Zm-10-10A2.25 2.25 0 0 1 11 5.25v3.5A2.25 2.25 0 0 1 8.75 11h-3.5A2.25 2.25 0 0 1 3 8.75v-3.5A2.25 2.25 0 0 1 5.25 3h3.5Zm10 0A2.25 2.25 0 0 1 21 5.25v3.5A2.25 2.25 0 0 1 18.75 11h-3.5A2.25 2.25 0 0 1 13 8.75v-3.5A2.25 2.25 0 0 1 15.25 3h3.5Z"/>
    </svg>
  )
}

export function FluentPeople(style: React.CSSProperties) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" style={{...icon_style, ...style}}>
      <path d="M14.75 15c.966 0 1.75.784 1.75 1.75l-.001.962c.117 2.19-1.511 3.297-4.432 3.297-2.91 0-4.567-1.09-4.567-3.259v-1c0-.966.784-1.75 1.75-1.75h5.5Zm-11-5h4.376a4.007 4.007 0 0 0 1.067 3.85l.162.151L9.25 14a2.75 2.75 0 0 0-2.649 2.008l-.034.001C3.657 16.009 2 14.919 2 12.75v-1c0-.966.784-1.75 1.75-1.75Zm16.5 0c.966 0 1.75.784 1.75 1.75l-.001.962c.117 2.19-1.511 3.297-4.432 3.297l-.169-.002a2.756 2.756 0 0 0-2.451-2L14.75 14l-.105.001a3.99 3.99 0 0 0 1.229-4L20.25 10ZM12 8a3 3 0 1 1 0 6 3 3 0 0 1 0-6ZM6.5 3a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm11 0a3 3 0 1 1 0 6 3 3 0 0 1 0-6Z"/>
    </svg>
  )
}

export function PassengerCircle(props: IconProps) {
  return (
    // <span className="h-3 w-3 bg-surface-text rounded-full" />
    <svg height={16} fill="currentColor" viewBox="0 0 100 100" {...props}>
      <circle cx="50" cy="50" r="50"/>
    </svg>
  )
}

export function PassengerTriangle(props: IconProps) {
  return (
    <svg height={16} fill="currentColor" viewBox="0 0 100 85" {...props}>
      <polygon points="50 0, 100 85, 0 85"/>
    </svg>
  )
}

export function PassengerSquare(props: IconProps) {
  return (
    // <span className="h-3 w-3 bg-surface-text" />
    <svg height={16} fill="currentColor" viewBox="0 0 100 100" {...props}>
      <rect width="100" height="100"/>
    </svg>
  )
}

export function Passengers(style: React.CSSProperties) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      width="40"
      height="16"
      viewBox="0 0 40 16"
      style={style}
    >
      <defs>
        <linearGradient
          id="a"
          x1={13.7}
          x2={2.3}
          y1={13.7}
          y2={2.3}
          gradientUnits="userSpaceOnUse"
        >
          <stop offset={0} stopColor="rgb(var(--color-surface-panel) / 0)" stopOpacity={0.0} />
          <stop
            offset={0.6}
            stopColor="currentColor"
            stopOpacity={0.4}
          />
          <stop offset={1} stopColor="currentColor" />
        </linearGradient>
        <linearGradient
          xlinkHref="#a"
          id="b"
          x1={25.5}
          x2={12.9}
          y1={18.9}
          y2={6.3}
        />
        <linearGradient xlinkHref="#a" id="c" x1={40} x2={24} y1={16} y2={0} />
      </defs>
      <circle
        cx={8}
        cy={8}
        r={8}
        style={{
          fill: "url(#a)",
        }}
      />
      <path
        d="M19.2 0 10 16h18.5L19.2 0z"
        style={{
          fill: "url(#b)",
        }}
      />
      <path
        d="M24 0h16v16H24z"
        style={{
          fill: "url(#c)",
        }}
      />
    </svg>
  )
}

export function Person(style: React.CSSProperties) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16" style={{...icon_style, ...style}}>
      <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6"/>
    </svg>
  )
}

export function Star(style: React.CSSProperties) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16" style={{...style}}>
      <polygon className="fill-surface-text" points="8 .6 5.7 5.7 0 6.3 4.3 10 3.1 15.5 8 12.6 12.9 15.5 11.7 10 16 6.3 10.3 5.7 8 .6 8 .6"/>
      <polyline className="fill-surface-main" points="8 4.5 8.8 6.4 9.2 7.2 10.1 7.3 12.1 7.5 10.7 8.8 9.9 9.4 10.1 10.3 10.6 12.3 8.8 11.2 8 10.7 7.2 11.2 5.4 12.3 5.9 10.3 6.1 9.4 5.3 8.8 3.9 7.5 5.9 7.3 6.8 7.2 7.2 6.4 8 4.5"/>
    </svg>
  )
}

export function StarFill(style: React.CSSProperties) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16" style={{...style}}>
      <polygon points="8 .6 5.7 5.7 0 6.3 4.3 10 3.1 15.5 8 12.6 12.9 15.5 11.7 10 16 6.3 10.3 5.7 8 .6 8 .6"/>
    </svg>
  )
}