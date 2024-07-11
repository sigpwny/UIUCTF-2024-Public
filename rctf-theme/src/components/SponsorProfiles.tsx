interface Props {
  link: string;
  children: React.ReactNode;
}

function SponsorProfile({ link, children }: Props) {
  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className="transition-transform motion-reduce:transition-none hover:scale-110 md:hover:scale-125 content-center p-4 sm:p-8"
    >
      {children}
    </a>
  )
}

export default function SponsorProfiles() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4">
      <SponsorProfile link="https://www.crowdstrike.com/">
        <CrowdStrike />
      </SponsorProfile>
      <SponsorProfile link="https://www.trailofbits.com/">
        <TrailOfBits />
      </SponsorProfile>
      <SponsorProfile link="https://www.zellic.io">
        <Zellic />
      </SponsorProfile>
      <SponsorProfile link="https://www.battelle.org/">
        <Battelle />
      </SponsorProfile>
      <SponsorProfile link="https://redlattice.com">
        <REDLattice />
      </SponsorProfile>
      <SponsorProfile link="https://goo.gle/ctfsponsorship">
        <GoogleCloud />
      </SponsorProfile>
    </div>
  )
}

function CrowdStrike() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 405.7 180.7" fill="currentColor">
      <path d="M241.3,105c-3.6-0.4-10-1.2-17.9,2.8c-8,4-11.1,4.2-15,3.8c1.1,2.1,3.5,5,10.8,5.5c7.3,0.5,10.8,0.7,7,9.9
        c0.1-2.8-0.6-8.1-7.8-7.1c-7.3,0.9-9,7.5-1.2,10.7c-2.5,0.5-7.9,0.8-11.7-9.2c-2.7,1.2-6.8,3.5-14.2-2.3c2.6,0.9,5.8,1,5.8,1
        c-6.6-3.1-12.9-9-16.9-14.5c3.2,2.4,6.7,4.8,10.3,5.2c-4.2-5.1-14-15.4-25.9-26c7.7,5,16.9,12.9,32.1,11.2
        C211.7,94,221.9,90.5,241.3,105"/>
      <path d="M176.3,101.4c-9.5-4.1-11.5-4.9-23.8-8.1c-12.2-3.1-24.3-9.6-32.3-19.7c5.7,4.2,17.2,12.5,29.1,11.6
        c-1.8-2.6-5.1-4.7-9.1-6.8C144.8,79.6,158.4,83.1,176.3,101.4"/>
      <path d="M155.6,66.2c-2.5-7-6.9-16-27.9-29.4c-10.2-6.7-25.2-15.2-45-36.8c1.4,5.8,7.7,21,39.1,40.6
        C132.2,47.7,145.6,52,155.6,66.2"/>
      <path d="M156.9,76.4c-2.6-6-7.8-13.6-28.1-24.5c-9.4-5.2-25.4-13.3-39.8-28.7c1.3,5.5,8,17.7,36.8,32.9
        C133.8,60.6,147.2,64.7,156.9,76.4"/>
      <path d="M233.8,92.1c7.5,1.1,7.1,2.7,7.2,5.5C237.8,94.1,233.8,92.1,233.8,92.1 M176.6,45.6C137,34.3,121.3,20,109.1,5
        c5.6,17.2,18.8,23.4,33,35c14.2,11.6,15,17.8,19.2,24.6c9.3,15.2,10.8,17.8,20,24.4c10.9,7.2,24,2.3,38.5,4.6
        c14.4,2.3,26.4,13.3,29,17.5c3-5.4-4.2-13.2-6.2-15.1c1-7.1-15.7-10.2-22-12.6c-1.2-0.5-4.3-1.2-1.7-7.5
        C222.5,67.1,226.3,59.5,176.6,45.6"/>
      <path d="M405.6,152.7v-8.9h-27.1v36.2h27.2v-8.9h-16.4v-5h12.4v-8.4h-12.4v-5H405.6z M361.6,160l12.2-15.4l-0.5-0.8
        h-11.5l-10,12.9v-12.9h-10.8v36.2h10.8v-11.2l2-2.3l9.2,13.5h11.3l0.5-0.8L361.6,160z M321.4,180.1h10.8v-36.2h-10.8V180.1z
        M294.2,152.7h5c2,0,3.8,1.3,3.8,3.8c0,2.4-1.8,3.6-3.8,3.6h-5V152.7z M307.5,165.8c3.9-1.8,6.5-5.1,6.5-9.9c0-7.4-5-12.1-14.4-12.1
        h-16.3v36.2h10.8v-12.7h2.6l6.7,12.7h10.8l0.5-0.8L307.5,165.8z M268.8,152.7h10.8v-8.9h-32.5v8.9H258v27.3h10.8V152.7z
        M229.3,180.7c7.9,0,14.8-3.9,14.8-11.4c0-8.2-6.9-10.3-13.1-12.1c-2.4-0.7-4.9-1.6-4.9-3.3c0-1.3,1.4-2.1,3.4-2.1
        c3.6,0,6.6,2.2,8.1,3.7h0.8l5.1-6.1v-0.8c-2.7-3.1-8.1-5.4-14.2-5.4c-8.4,0-14.3,4.6-14.3,11.2c0,7.1,6.4,10.3,11.9,11.8
        c3.6,1,6,1.2,6,3.1c0,1.4-1.7,2.2-4.3,2.2c-3.3,0-7.4-2.2-9.3-4.1h-0.8l-5,6.4v0.8C216.8,178.2,222.6,180.7,229.3,180.7
        M190.7,171.1h-5.3v-18.4h5.3c4.8,0,8.2,3.3,8.2,9.2C198.9,167.8,195.5,171.1,190.7,171.1 M191.2,143.8h-16.6v36.2h16.6
        c11.6,0,18.8-7.2,18.8-18.2C210,151.1,202.8,143.8,191.2,143.8 M169,143.8h-10.3l-6.4,20.1l-6.8-20.1H139l-6.7,20l-6.4-20h-10.3
        l-0.5,0.8l13.2,35.4h6.6l7.4-19.7l7.5,19.7h6.6l13.2-35.4L169,143.8z M94.2,170.8c-4.9,0-8.8-3.7-8.8-8.9c0-5.2,3.9-8.9,8.8-8.9
        c4.9,0,8.8,3.7,8.8,8.9C103,167.1,99.1,170.8,94.2,170.8 M94.2,180.7c11.3,0,19.8-8.1,19.8-18.8c0-10.8-8.5-18.8-19.8-18.8
        c-11.3,0-19.8,8-19.8,18.8C74.3,172.7,82.9,180.7,94.2,180.7 M50.2,160.1v-7.4h5c2,0,3.8,1.3,3.8,3.8c0,2.4-1.7,3.6-3.8,3.6H50.2z
        M70.8,171.2l-0.6-0.4c-0.3,0.2-0.6,0.4-1.4,0.4c-1.3,0-2-1.3-2.7-2.4c-1.1-1.7-2-2.6-2.7-3c4-1.8,6.7-5.1,6.7-9.9
        c0-7.4-5-12.1-14.4-12.1H39.4v36.2h10.8v-12.7h1c2.4,0,5.5,5.2,6.9,7.6c3,4.7,5.3,5.8,9.5,5.8c2,0,3.6-0.7,4.6-1.6l0.3-0.8
        L70.8,171.2z M19.6,180.7c6.6,0,11.8-2.9,15.1-7V173l-6.6-5.7h-0.8c-1.8,2-4.6,3.5-7.7,3.5c-4.9,0-8.7-3.7-8.7-8.9
        c0-5.1,3.8-8.9,8.7-8.9c3.1,0,5.9,1.5,7.7,3.5h0.8l6.6-5.7v-0.8c-3.4-4.2-8.9-7-15-7c-11.3,0-19.8,8-19.8,18.8
        C0,172.7,8.6,180.7,19.6,180.7"/>
    </svg>
  )
}

function TrailOfBits() {
  return (
    <svg viewBox="0 0 94 56" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M34.0391 54.6616L26.4307 50.515L24.5922 56L34.0248 54.6651C33.9961 54.6651 33.9817 54.6651 34.0391 54.6616Z" />
      <path d="M34.0388 54.6616L34.0246 54.6652C34.0601 54.6652 34.1205 54.6616 34.0388 54.6616Z" />
      <path d="M60.2294 51.9919L66.3542 50.1884L68.655 42.9283L62.9997 43.3153L60.2294 51.9919Z" />
      <path d="M74.8048 5.47788L70.1243 2.4425L67.5045 10.7747L72.6545 12.3226L74.8048 5.47788Z" />
      <path d="M43.2242 3.5324C43.2242 3.5324 46.3959 4.50514 47.6467 4.86015L52.1551 6.19501L52.2339 0L44.3065 1.57627L43.2242 3.5324Z" />
      <path d="M11.7511 26.6722L17.3168 26.6864L19.2986 20.4701L14.2383 19.1282C13.7007 20.8358 12.2995 24.9646 11.7511 26.6722Z" />
      <path d="M1.39397 20.8961L5.55836 25.2344L7.95593 17.5377L2.84541 16.1815L1.39397 20.8961Z" />
      <path d="M89.5987 45.7365C89.5127 43.5567 88.907 42.8432 87.6205 41.5048L80.9116 41.9521C82.7823 43.1272 83.9291 44.5827 84.1657 46.5353C84.4273 48.6796 82.0978 51.1576 79.8436 51.1576C78.5857 51.1576 77.9585 50.1707 77.9585 49.0382C77.9943 48.1932 78.2918 47.0962 78.7362 46.3649H78.7003H73.0451C72.6007 47.501 72.2316 48.7826 72.2316 49.9896C72.2316 54.1255 75.8906 55.187 79.3633 55.187C82.983 55.187 85.9791 54.4912 87.8642 51.1576C88.7135 49.6524 89.6704 47.4939 89.5987 45.7365Z" />
      <path d="M18.8043 0.560913L1.36185 0.575114L0 4.86014L6.39352 4.85304L3.2326 14.8148L8.3467 16.1709L11.8983 4.84949L17.4424 4.84239L18.8043 0.560913Z" />
      <path d="M20.7074 15.8976C21.3346 15.8585 21.9653 15.8585 22.5925 15.8585C23.6282 15.855 25.18 15.9295 25.18 17.3567C25.1836 18.3436 24.8144 19.5897 24.5206 20.5412C23.9687 22.4831 23.3057 24.4215 23.1946 26.3989L28.9215 26.3918C28.771 23.2073 30.7636 20.424 30.76 17.275C30.76 15.152 29.1329 14.3106 27.2479 13.9805L27.7998 13.9059C31.9032 13.3521 34.1897 10.1676 34.1861 6.17726C34.1825 1.75378 30.4482 0.511228 26.6422 0.514778L20.0659 0.521878C18.1951 6.27312 16.4212 12.0563 14.6042 17.8324L19.6609 19.1708L20.7074 15.8976ZM24.2446 4.57969L26.0939 4.57615C27.4629 4.57615 28.8283 4.90276 28.8319 6.51453C28.8355 8.49196 27.3948 11.8255 25.0295 11.8255L21.9976 11.8291L24.2446 4.57969Z" />
      <path d="M36.2035 26.4628L39.1529 20.9316L46.213 20.9245L45.998 26.4876L51.5422 26.4841L51.983 7.54402L47.2201 6.11331C46.7864 9.66701 46.5427 13.2598 46.5427 16.8241H46.5069L41.1849 16.8277C43.0987 13.242 44.9336 9.62795 46.5858 5.9216L42.769 4.7749L30.4371 26.4663L36.2035 26.4628Z" />
      <path d="M75.4534 26.4272L76.8547 22.2132L69.4254 22.2239L72.1778 13.6112L67.0278 12.0634L62.4442 26.4379L75.4534 26.4272Z" />
      <path d="M41.0415 28.0852H33.7628L26.9285 49.2654L35.6264 53.9587C40.8337 53.7634 44.482 49.947 44.482 44.707C44.482 42.6941 43.2241 41.1214 41.2673 40.5711C45.1128 39.6942 47.5856 37.241 47.5856 33.2152C47.582 29.2923 44.5143 28.0852 41.0415 28.0852ZM38.0491 48.4027C37.0133 49.9399 35.9059 50.05 34.1678 50.05H31.9136L34.39 42.4385C36.1998 42.5095 39.4145 42.0728 39.4145 44.707C39.4145 45.875 38.7157 47.4513 38.0491 48.4027ZM37.6047 38.7357H35.5332L37.7122 32.0365C39.3392 32.1111 42.407 31.5999 42.407 34.0885C42.4464 37.0174 40.5613 38.7357 37.6047 38.7357Z" />
      <path d="M58.6706 9.58191L53.148 27.8723L48.2704 42.7083L54.1264 42.261L58.3553 29.0616H58.3624L64.075 11.183C63.2794 10.9629 60.1113 9.95467 58.6706 9.58191Z" />
      <path d="M61.4087 28.1243L60.0397 32.4022H66.4368L63.4443 41.9272L69.0279 41.5474L71.9415 32.4022H77.4821L78.8511 28.1243H61.4087Z" />
      <path d="M86.7607 27.8651C81.0338 27.8651 77.6328 31.8164 77.6328 37.3085C77.6399 38.1073 78.3603 40.0741 79.8332 40.7308L86.7213 40.2693C85.5494 39.2895 83.4779 36.9783 83.4779 35.75C83.4779 34.0637 84.4277 31.859 86.388 31.859C87.7176 31.859 88.5311 32.2247 88.5311 33.6519C88.5311 34.5678 88.0867 35.4092 87.8287 36.2896H93.1506C93.4839 35.5192 94 33.7619 94 32.956C94.0036 28.9621 90.0865 27.8651 86.7607 27.8651Z" />
      <path d="M23.6104 28.2379C21.0049 28.2379 20.6322 30.1443 19.9871 32.1679C19.7721 32.8957 19.3635 33.7833 19.3635 34.5465C19.3635 36.0163 20.6788 36.2968 21.9009 36.2968C23.3953 36.3074 24.1909 35.8104 24.7213 34.4187C25.0833 33.4673 26.0258 30.8508 26.0258 29.9313C26.0258 28.6284 24.6998 28.2379 23.6104 28.2379ZM24.3379 30.1088C24.3379 30.4355 23.9652 31.5005 23.8397 31.8733L23.2627 33.6554C23.0369 34.33 22.7646 35.1039 21.9045 35.1039C21.4171 35.1039 21.1017 34.8234 21.1017 34.3193C21.1017 33.6661 21.6106 32.4555 21.8256 31.781C22.0406 31.11 22.3238 29.7716 23.0728 29.5124C23.2412 29.4556 23.424 29.4343 23.6068 29.4343C23.9472 29.4343 24.3558 29.7361 24.3558 30.0982L24.3379 30.1088Z" />
      <path d="M30.2401 32.782L30.6343 31.4898H28.3693L28.9821 29.562H31.3618L31.7811 28.2698H27.6561L25.1761 36.1937H26.9107L27.9858 32.782H30.2401Z" />
    </svg>
  )
}

function Zellic() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 880 245" fill='currentColor'>
      <g>
        <path d="m432.47,50.5h-100.03v-24h133.27v24l-104.26,139v5h103.98v24h-137.51v-24l104.54-139v-5Z"/>
        <path d="m533.04,221.89c-10.35,0-19.44-1.88-27.25-5.65-7.81-3.76-14.31-8.94-19.48-15.53-5.18-6.59-9.04-14.49-11.58-23.72-2.54-9.22-3.81-19.39-3.81-30.49s1.36-21.04,4.09-30.35c2.73-9.32,6.78-17.27,12.14-23.86,5.36-6.59,11.86-11.76,19.48-15.53,7.62-3.76,16.42-5.65,26.4-5.65s19.38,1.79,27.11,5.36c7.72,3.58,14.12,8.47,19.2,14.68,5.08,6.21,8.89,13.51,11.44,21.88,2.54,8.38,3.81,17.36,3.81,26.97v13.55h-96.85v15.25c0,5.27.99,9.93,2.96,13.98,1.98,4.05,4.66,7.48,8.05,10.31,3.39,2.82,7.2,4.94,11.44,6.35,4.24,1.41,8.61,2.12,13.13,2.12,9.04,0,16.84-2.3,23.44-6.92,6.59-4.61,10.35-11.9,11.29-21.88h25.41c-.56,7.72-2.59,14.59-6.07,20.61-3.49,6.03-8,11.15-13.55,15.39-5.55,4.24-11.82,7.48-18.78,9.74-6.97,2.26-14.31,3.39-22.02,3.39Zm35.29-96.57c0-5.27-.95-10.02-2.82-14.26-1.88-4.24-4.47-7.81-7.76-10.73-3.3-2.92-7.06-5.13-11.29-6.64-4.24-1.5-8.71-2.26-13.41-2.26s-9.18.75-13.41,2.26c-4.24,1.51-8,3.72-11.29,6.64-3.3,2.92-5.89,6.49-7.76,10.73-1.88,4.24-2.82,8.99-2.82,14.26v7.91h70.59v-7.91Z"/>
        <g>
          <rect x="714.51" y="26.5" width="26.54" height="26.54"/>
          <path d="m613.43,218.5V26.5h25.41v192h-25.41Z"/>
          <path d="m664.25,218.5V26.5h25.41v192h-25.41Z"/>
          <rect x="715.08" y="74.5" width="25.41" height="144"/>
        </g>
        <path d="m759.64,147.63c0-11.48,1.36-21.98,4.09-31.48,2.73-9.5,6.73-17.55,12-24.14,5.27-6.59,11.76-11.72,19.48-15.39,7.72-3.67,16.47-5.51,26.26-5.51,7.53,0,14.63.99,21.32,2.96,6.68,1.98,12.57,5.04,17.65,9.18,5.08,4.14,9.22,9.41,12.42,15.81,3.2,6.4,5.17,13.93,5.93,22.59h-25.41c-.56-5.83-1.79-10.68-3.67-14.54-1.88-3.86-4.33-6.96-7.34-9.32-3.01-2.35-6.45-4-10.31-4.94-3.86-.94-7.86-1.41-12-1.41s-8.47.71-12.42,2.12c-3.95,1.41-7.53,3.53-10.73,6.35-3.2,2.82-5.74,6.35-7.62,10.59-1.88,4.24-2.82,9.18-2.82,14.82v42.35c0,5.08.89,9.74,2.68,13.98,1.79,4.24,4.24,7.81,7.34,10.73,3.11,2.92,6.68,5.18,10.73,6.78,4.05,1.6,8.42,2.4,13.13,2.4,9.41,0,17.22-2.54,23.44-7.62,6.21-5.08,9.79-12.99,10.73-23.72h25.41c-.94,8.85-3.2,16.52-6.78,23.01-3.58,6.49-8,11.86-13.27,16.09-5.27,4.24-11.25,7.39-17.93,9.46-6.68,2.07-13.69,3.11-21.04,3.11-10.54,0-19.62-1.84-27.25-5.51-7.62-3.67-13.98-8.85-19.06-15.53-5.08-6.68-8.85-14.54-11.29-23.58-2.45-9.04-3.67-18.92-3.67-29.65Z"/>
      </g>
      <g>
        <polygon points="84 2.5 84 99.41 68 90.17 68 2.5 84 2.5"/>
        <polygon points="116 2.5 116 117.88 100 108.64 100 2.5 116 2.5"/>
        <polygon points="8.08 111 92 159.45 76 168.69 .08 124.85 8.08 111"/>
        <polygon points="24.08 83.28 124 140.97 108 150.21 16.08 97.14 24.08 83.28"/>
        <polygon points="64.08 231 148 182.54 148 201.02 72.08 244.85 64.08 231"/>
        <polygon points="48.08 203.28 148 145.59 148 164.07 56.08 217.14 48.08 203.28"/>
        <polygon points="196 242.5 196 145.59 212 154.83 212 242.5 196 242.5"/>
        <polygon points="164 242.5 164 127.12 180 136.36 180 242.5 164 242.5"/>
        <polygon points="271.92 134 188 85.55 204 76.31 279.92 120.15 271.92 134"/>
        <polygon points="255.92 161.72 156 104.03 172 94.79 263.92 147.86 255.92 161.72"/>
        <polygon points="215.92 14 132 62.46 132 43.98 207.92 .15 215.92 14"/>
        <polygon points="231.92 41.72 132 99.41 132 80.93 223.92 27.86 231.92 41.72"/>
      </g>
    </svg>
  )
}

function REDLattice() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 720 216" fill="currentColor">
      <g>
        <path d="m86.84,189.19l-12.32-68.2h-6.38v68.2h-23.76V27.49h23.76c28.38,0,40.48,16.06,40.48,46.64,0,16.06-4.18,30.58-13.2,36.74l15.18,78.32h-23.76Zm-18.7-90.2c3.3,0,7.7-.44,11.22-3.52,3.52-3.08,6.38-9.02,6.38-20.46s-2.86-17.6-6.38-20.68-7.92-3.3-11.22-3.3v47.96Z" />
        <path d="m123.79,27.49h54.34v24.42h-30.58v42.46h22v25.96h-22v44.44h30.58v24.42h-54.34V27.49Z" />
        <path d="m191.33,189.19V27.49h18.7c22,0,33.88,4.4,40.26,16.72,6.16,12.32,7.04,32.56,7.04,64.24s-.88,51.7-7.04,64.02c-6.38,12.32-18.26,16.72-40.26,16.72h-18.7Zm23.76-23.76c8.14,0,12.76-.88,15.18-8.8,1.1-3.74,1.98-9.46,2.2-17.16.22-7.7.22-18.04.22-31.24s0-23.54-.22-31.24c-.22-7.48-1.1-13.2-2.2-17.16-2.42-7.7-7.04-8.58-15.18-8.58v114.18Z" />
        <g fill="red">
          <path d="m269.8,26.49h23.76v139.7h31.46v22h-55.22V26.49Z" />
          <path d="m368.36,96.45c0-1.98,0-5.06-.66-7.26-.88-2.2-2.64-3.74-5.5-3.74-3.74,0-5.28,2.86-5.94,6.38-.22,1.76-.44,3.74-.44,5.72v5.72h-22.22v-5.06c0-8.8,3.3-16.72,8.58-22.66s12.76-9.46,21.34-9.46c7.26,0,13.86,2.86,18.92,7.7,5.06,4.84,8.14,11.66,8.14,19.58v73.92c0,10.78.66,15.62,1.54,20.9h-21.78c-1.98-2.42-1.98-8.14-1.98-9.68h-1.54c-1.1,1.98-3.08,4.84-6.16,7.26s-7.26,4.18-11.66,4.18c-2.86,0-7.48-1.1-11-5.5-3.74-4.18-6.82-11.66-6.82-24.2,0-13.42,3.96-23.1,9.24-29.7,5.28-6.6,11.88-10.78,17.38-13.64s9.68-4.84,10.56-7.26v-13.2Zm0,33.66c-10.78,4.62-15.4,15.4-15.4,26.84,0,1.54.22,4.18,1.1,6.6.88,2.64,2.42,4.62,5.06,4.62,5.06,0,9.24-3.08,9.24-7.26v-30.8Z" />
          <path d="m431.06,38.15v29.7h15.18v20.02h-15.18v59.84c0,3.74,0,8.58.88,12.54.88,3.96,2.64,7.26,6.16,7.26,1.76,0,3.96-.22,5.5-.44.88-.22,1.76-.22,2.64-.44v21.78c-1.1.22-2.2.66-3.3.88-2.2.44-5.06.66-8.58.66-12.98,0-19.14-6.6-22.22-14.96s-3.3-18.48-3.3-25.52v-61.6h-11.22v-20.02h11.22v-29.7h22.22Z" />
          <path d="m483.64,38.15v29.7h15.18v20.02h-15.18v59.84c0,3.74,0,8.58.88,12.54.88,3.96,2.64,7.26,6.16,7.26,1.76,0,3.96-.22,5.5-.44.88-.22,1.76-.22,2.64-.44v21.78c-1.1.22-2.2.66-3.3.88-2.2.44-5.06.66-8.58.66-12.98,0-19.14-6.6-22.22-14.96s-3.3-18.48-3.3-25.52v-61.6h-11.22v-20.02h11.22v-29.7h22.22Z" />
          <path d="m510.7,26.49h22.22v22.22h-22.22v-22.22Zm0,161.7v-120.34h22.22v120.34h-22.22Z" />
          <path d="m570.54,160.47c0,4.4.22,9.68,6.16,9.68,5.06,0,6.38-2.42,6.38-9.68v-16.72h22.22v11.66c0,13.42-2.42,22-7.26,27.28-4.84,5.28-11.88,7.26-21.34,7.26-7.92,0-15.18-2.2-20.24-7.7-5.06-5.5-8.14-14.52-8.14-27.94v-52.58c0-13.42,3.08-22.44,8.14-27.94,5.06-5.5,12.32-7.7,20.24-7.7,9.46,0,16.5,1.98,21.34,7.26,4.84,5.28,7.26,13.86,7.26,27.28v9.46h-22.22v-14.52c0-7.26-1.32-9.68-6.38-9.68-5.94,0-6.16,5.28-6.16,9.68v64.9Z" />
          <path d="m675.03,145.07v13.86c-.66,11.66-4.18,19.8-12.1,26.18-3.96,3.3-9.46,4.84-16.72,4.84-14.3,0-21.56-7.92-25.08-15.84-1.98-4.62-3.3-9.9-3.52-15.84v-60.5c.66-11.66,4.4-20.24,12.32-26.84,3.74-3.3,9.24-4.84,16.5-4.84,14.3,0,21.56,7.92,25.08,15.62,1.98,4.62,3.3,9.68,3.52,15.4v34.98h-36.74v26.18c.22,4.62,1.54,7.92,3.52,10.34,1.1,1.1,2.64,1.76,4.62,1.76,4.18,0,6.16-2.64,7.04-5.94.66-1.76.88-3.74.88-6.16v-13.2h20.68Zm-36.74-30.36h16.06v-16.94c0-4.62-.88-7.92-3.08-10.56-1.1-1.1-2.86-1.76-4.84-1.76-4.18,0-5.94,2.86-7.04,6.16-.66,1.76-.88,3.74-1.1,6.16v16.94Z" />
        </g>
      </g>
    </svg>
  )
}

function Battelle() {
  return (
    <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 213.8 60.6" fill="currentColor">
      <g>
        <path style={{ fillRule: "evenodd", clipRule: "evenodd" }} d="M152,38l-3.1,8.7h-20l11.7-32.3h10.5L142.5,38H152L152,38z M189.7,22.6l-1.4,3.9h9.8l-2.7,7.4h-9.8l-1.5,4.1
          h9.8l-3.2,8.7h-40.1l11.7-32.3H173L164.4,38h9.2l8.6-23.6h20.4l-3,8.2H189.7L189.7,22.6z M129.8,38l-3.1,8.7h-20.4l8.6-23.6h-7.8
          l-8.6,23.6H88l8.6-23.6h-12L76,46.7H65.5L74,23.1h-7l3.2-8.7h68.2l-3,8.2h-9.8l-1.4,3.9h9.8l-2.7,7.4h-9.8L120,38H129.8L129.8,38z
          M53.6,35.6h-2.8l4.8-8.8L53.6,35.6L53.6,35.6z M54.5,14.4L35,46.7h9.4l2.8-4.8h5.2l-0.9,4.8h10.5l4-32.3H54.5L54.5,14.4z M33,23.7
          l-0.9,2.5c-0.4,1.2-1.2,1.7-2.4,1.7H28l2.1-5.9h1.6C33,22,33.4,22.4,33,23.7L33,23.7z M28.9,35L28,37.5c-0.4,1.2-1.3,1.7-2.5,1.7
          h-1.6l2.2-6h1.6C28.9,33.2,29.3,33.8,28.9,35L28.9,35z M37.6,38.6l0.6-1.6c1.2-3.2,0.7-5.8-3-6.7c4.2-0.8,6.7-3.7,7.8-6.7l0.4-1.1
          c1.7-4.6,0.4-8.1-5.9-8.1H22.4L10.7,46.7h15.3C32.2,46.7,36,43.2,37.6,38.6L37.6,38.6z"/>
      </g>
    </svg>
  )
}

function GoogleCloud() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 60">
      <path d="M64.87 11.572l1.144.02 3.108-3.108.15-1.317c-2.47-2.197-5.72-3.534-9.277-3.534-6.44 0-11.876 4.382-13.486 10.318.34-.237 1.065-.06 1.065-.06l6.212-1.022s.32-.53.48-.497a7.76 7.76 0 0 1 10.605-.8z" fill="#ea4335"/>
      <path d="M73.5 13.962a13.99 13.99 0 0 0-4.216-6.796l-4.402 4.402a7.75 7.75 0 0 1 2.895 6.039v.777c2.142 0 3.88 1.743 3.88 3.88s-1.743 3.88-3.88 3.88h-7.762l-.777.78v4.658l.777.773h7.762A10.11 10.11 0 0 0 77.86 22.265c-.004-3.436-1.736-6.48-4.37-8.303z" fill="#4285f4"/>
      <path d="M52.234 32.362h7.76V26.15h-7.76a3.84 3.84 0 0 1-1.597-.347l-1.12.343-3.108 3.108-.272 1.05a9.96 9.96 0 0 0 6.098 2.06z" fill="#34a853"/>
      <path d="M52.234 12.175A10.11 10.11 0 0 0 42.14 22.269a10.08 10.08 0 0 0 4 8.04l4.5-4.5a3.88 3.88 0 0 1-2.288-3.538c0-2.142 1.743-3.88 3.88-3.88a3.89 3.89 0 0 1 3.538 2.288l4.5-4.5c-1.846-2.43-4.76-4-8.04-4z" fill="#fbbc05"/>
      <path d="M12 51.937c-2.12 0-3.94-.75-5.474-2.25s-2.3-3.304-2.3-5.408.765-3.908 2.3-5.408S9.883 36.62 12 36.62a7.32 7.32 0 0 1 5.249 2.11l-1.477 1.477a5.32 5.32 0 0 0-3.773-1.495c-1.53 0-2.83.54-3.896 1.627a5.41 5.41 0 0 0-1.597 3.941c0 1.546.53 2.857 1.597 3.94a5.25 5.25 0 0 0 3.896 1.627c1.558 0 2.845-.5 3.87-1.534.6-.6 1-1.5 1.14-2.635h-5.006v-2.092h7.044c.075.372.1.8.1 1.3 0 2.056-.603 3.686-1.813 4.895-1.372 1.435-3.15 2.15-5.345 2.15zm16.37-1.4c-.96.94-2.13 1.4-3.512 1.4s-2.554-.47-3.512-1.4-1.438-2.113-1.438-3.52.48-2.58 1.438-3.52 2.13-1.4 3.512-1.4 2.554.47 3.512 1.4 1.438 2.116 1.438 3.52-.48 2.58-1.438 3.52zm-5.474-1.38a2.63 2.63 0 0 0 1.963.849c.76 0 1.414-.282 1.963-.85s.822-1.28.822-2.14c0-.87-.27-1.588-.813-2.15s-1.198-.84-1.972-.84a2.64 2.64 0 0 0-1.972.84c-.543.56-.813 1.276-.813 2.15 0 .858.273 1.573.822 2.14zm16.273 1.38c-.96.94-2.13 1.4-3.512 1.4s-2.554-.47-3.512-1.4-1.438-2.113-1.438-3.52.48-2.58 1.438-3.52 2.13-1.4 3.512-1.4 2.554.47 3.512 1.4 1.438 2.116 1.438 3.52-.48 2.58-1.438 3.52zm-5.474-1.38a2.63 2.63 0 0 0 1.963.849c.76 0 1.414-.282 1.963-.85s.822-1.28.822-2.14c0-.87-.27-1.588-.813-2.15s-1.198-.84-1.972-.84a2.64 2.64 0 0 0-1.972.84c-.543.56-.813 1.276-.813 2.15 0 .858.273 1.573.822 2.14zm12.573 7.22c-1.095 0-2.017-.294-2.764-.88s-1.282-1.264-1.606-2.038l1.888-.783c.198.474.5.885.933 1.234s.94.522 1.552.522c.822 0 1.468-.25 1.933-.747s.7-1.216.7-2.15v-.7h-.075c-.6.747-1.477 1.122-2.596 1.122-1.258 0-2.36-.48-3.307-1.438a4.76 4.76 0 0 1-1.42-3.476 4.82 4.82 0 0 1 1.42-3.503c.945-.963 2.05-1.447 3.307-1.447.56 0 1.068.105 1.522.318s.813.474 1.074.783h.075V42.4h2.056v8.857c0 1.72-.438 3.004-1.318 3.86-.88.85-2.002 1.28-3.373 1.28zm.15-6.372a2.41 2.41 0 0 0 1.879-.849c.504-.567.756-1.273.756-2.122 0-.858-.252-1.576-.756-2.15a2.4 2.4 0 0 0-1.879-.858c-.76 0-1.408.288-1.942.858s-.804 1.288-.804 2.15c0 .846.267 1.555.804 2.122s1.183.85 1.942.85zM54.62 37.14v14.5h-2.167v-14.5zm5.94 14.796c-1.396 0-2.56-.474-3.494-1.42s-1.402-2.116-1.402-3.512c0-1.444.45-2.63 1.354-3.55a4.45 4.45 0 0 1 3.298-1.384c.597 0 1.153.108 1.663.327a3.92 3.92 0 0 1 1.27.84 5.84 5.84 0 0 1 .804.999 6.12 6.12 0 0 1 .486.972l.225.56L58.17 48.5c.5.996 1.3 1.495 2.392 1.495.996 0 1.807-.453 2.428-1.363l1.68 1.122c-.375.56-.903 1.065-1.588 1.513s-1.528.67-2.524.67zm-2.746-5.08l4.4-1.83c-.126-.312-.354-.564-.7-.756a2.26 2.26 0 0 0-1.14-.288c-.636 0-1.23.26-1.783.783s-.82 1.222-.795 2.092zm18.33 5.08c-1.97 0-3.62-.666-4.952-2s-2-2.995-2-4.988.666-3.656 2-4.988 2.983-2 4.952-2c2.017 0 3.656.73 4.913 2.185l-1.195 1.16c-.9-1.134-2.15-1.7-3.72-1.7-1.46 0-2.686.492-3.7 1.477s-1.504 2.272-1.504 3.866.5 2.884 1.504 3.87 2.233 1.477 3.7 1.477c1.606 0 2.977-.648 4.1-1.942l1.195 1.195a6.51 6.51 0 0 1-2.3 1.747 7.02 7.02 0 0 1-3.004.642zm8.556-.296h-1.72V38.263h1.72zm2.803-8.06c.885-.927 2-1.393 3.382-1.393s2.497.465 3.382 1.393 1.327 2.1 1.327 3.485-.44 2.557-1.327 3.485-2 1.393-3.382 1.393-2.497-.465-3.382-1.393-1.327-2.1-1.327-3.485.44-2.557 1.327-3.485zm1.28 5.883c.6.603 1.294.906 2.1.906s1.5-.303 2.1-.906.888-1.405.888-2.4-.297-1.798-.888-2.4-1.294-.906-2.1-.906-1.5.303-2.1.906-.888 1.405-.888 2.4.297 1.798.888 2.4zm16.32 2.177h-1.645v-1.27h-.075c-.26.435-.66.807-1.195 1.1s-1.1.46-1.7.46c-1.147 0-2.014-.348-2.605-1.047s-.888-1.633-.888-2.803v-5.606h1.72v5.324c0 1.708.753 2.56 2.26 2.56a2.1 2.1 0 0 0 1.738-.858 3.13 3.13 0 0 0 .672-1.981v-5.045h1.72v9.157zm5.828.297c-1.183 0-2.206-.468-3.064-1.402s-1.288-2.092-1.288-3.476.43-2.542 1.288-3.476 1.882-1.402 3.064-1.402c.696 0 1.324.15 1.88.447s.97.672 1.243 1.122h.075l-.075-1.27v-4.22h1.72v13.38h-1.645v-1.27h-.075c-.273.447-.687.822-1.243 1.122-.555.294-1.183.444-1.88.444zm.28-1.57a2.74 2.74 0 0 0 2.065-.897c.567-.597.85-1.402.85-2.4s-.282-1.813-.85-2.4a2.74 2.74 0 0 0-2.065-.897c-.798 0-1.483.303-2.056.906s-.858 1.405-.858 2.4.285 1.798.858 2.4a2.73 2.73 0 0 0 2.056.906z" fill="currentColor"/>
    </svg>
  )
}