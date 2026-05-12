const StarField = () => {
  return (
    <div className="starfield">
      <div className="stars stars-sm" />
      <div className="stars stars-md" />
      <div className="stars stars-lg" />
      <style>{`
        .starfield {
          position: fixed;
          inset: 0;
          z-index: 0;
          pointer-events: none;
          overflow: hidden;
        }
        [data-theme="light"] .starfield { opacity: 0.3; }
        .stars {
          position: absolute;
          inset: 0;
          border-radius: 50%;
        }
        .stars-sm {
          width: 2px;
          height: 2px;
          box-shadow:
            120px 80px rgba(var(--rgb-base), 0.3), 340px 180px rgba(var(--rgb-base), 0.2),
            560px 40px rgba(var(--rgb-base), 0.25), 780px 220px rgba(var(--rgb-base), 0.15),
            150px 320px rgba(var(--rgb-base), 0.2), 450px 400px rgba(var(--rgb-base), 0.3),
            650px 520px rgba(var(--rgb-base), 0.15), 850px 600px rgba(var(--rgb-base), 0.2),
            200px 700px rgba(var(--rgb-base), 0.25), 500px 800px rgba(var(--rgb-base), 0.15),
            700px 900px rgba(var(--rgb-base), 0.2), 900px 100px rgba(var(--rgb-base), 0.3),
            100px 500px rgba(var(--rgb-base), 0.2), 300px 650px rgba(var(--rgb-base), 0.15),
            600px 150px rgba(var(--rgb-base), 0.25), 800px 350px rgba(var(--rgb-base), 0.2),
            180px 250px rgba(var(--rgb-base), 0.3), 400px 550px rgba(var(--rgb-base), 0.15),
            550px 750px rgba(var(--rgb-base), 0.2), 750px 850px rgba(var(--rgb-base), 0.25),
            100px 150px rgba(var(--rgb-base), 0.2), 250px 450px rgba(var(--rgb-base), 0.15),
            480px 280px rgba(var(--rgb-base), 0.3), 680px 480px rgba(var(--rgb-base), 0.2),
            880px 680px rgba(var(--rgb-base), 0.15), 50px 820px rgba(var(--rgb-base), 0.25),
            350px 120px rgba(var(--rgb-base), 0.2), 630px 620px rgba(var(--rgb-base), 0.3),
            820px 250px rgba(var(--rgb-base), 0.15), 950px 500px rgba(var(--rgb-base), 0.2);
          animation: twinkleSm 4s ease-in-out infinite;
        }
        .stars-md {
          width: 3px;
          height: 3px;
          box-shadow:
            250px 120px rgba(var(--rgb-base), 0.25), 500px 300px rgba(var(--rgb-base), 0.15),
            750px 80px rgba(var(--rgb-base), 0.2), 200px 500px rgba(var(--rgb-base), 0.3),
            450px 650px rgba(var(--rgb-base), 0.15), 700px 200px rgba(var(--rgb-base), 0.25),
            150px 380px rgba(var(--rgb-base), 0.2), 400px 150px rgba(var(--rgb-base), 0.3),
            600px 450px rgba(var(--rgb-base), 0.15), 850px 550px rgba(var(--rgb-base), 0.2),
            100px 600px rgba(var(--rgb-base), 0.25), 300px 800px rgba(var(--rgb-base), 0.15),
            550px 100px rgba(var(--rgb-base), 0.2), 800px 400px rgba(var(--rgb-base), 0.3),
            350px 350px rgba(var(--rgb-base), 0.15);
          animation: twinkleMd 6s ease-in-out infinite;
        }
        .stars-lg {
          width: 4px;
          height: 4px;
          box-shadow:
            180px 200px rgba(var(--rgb-base), 0.3), 420px 450px rgba(var(--rgb-base), 0.2),
            680px 150px rgba(var(--rgb-base), 0.25), 320px 600px rgba(var(--rgb-base), 0.15),
            580px 700px rgba(var(--rgb-base), 0.2), 780px 300px rgba(var(--rgb-base), 0.3),
            120px 400px rgba(var(--rgb-base), 0.15), 520px 550px rgba(var(--rgb-base), 0.25),
            720px 800px rgba(var(--rgb-base), 0.2), 920px 200px rgba(var(--rgb-base), 0.15);
          animation: twinkleLg 8s ease-in-out infinite;
        }
        @keyframes twinkleSm {
          0%, 100% { opacity: 0.3; transform: translateY(0); }
          50% { opacity: 0.8; transform: translateY(-4px); }
        }
        @keyframes twinkleMd {
          0%, 100% { opacity: 0.2; transform: translateY(0); }
          50% { opacity: 0.7; transform: translateY(-6px); }
        }
        @keyframes twinkleLg {
          0%, 100% { opacity: 0.15; transform: translateY(0); }
          50% { opacity: 0.6; transform: translateY(-8px); }
        }
      `}</style>
    </div>
  );
};

export default StarField;
