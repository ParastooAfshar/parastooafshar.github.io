(() => {
    const canvas = document.getElementById("hero-constellation");

    if (!canvas) return;

    const ctx = canvas.getContext("2d");

    let width = 0;
    let height = 0;
    let dpr = 1;

    let particles = [];
    let accent = "#60a5fa";

    const PARTICLES_PER_SIDE = 9;
    const CONNECTION_DISTANCE = 175;

    function getAccentColor() {
        const value = getComputedStyle(document.documentElement)
            .getPropertyValue("--accent")
            .trim();

        if (value) {
            accent = value;
        }
    }

    function hexToRgb(hex) {
        const cleaned = hex.replace("#", "");

        if (cleaned.length !== 6) {
            return {
                r: 96,
                g: 165,
                b: 250
            };
        }

        return {
            r: parseInt(cleaned.substring(0, 2), 16),
            g: parseInt(cleaned.substring(2, 4), 16),
            b: parseInt(cleaned.substring(4, 6), 16)
        };
    }

    function createParticle(side) {
        const leftSide = side === "left";

        return {
            x: leftSide
                ? Math.random() * width * 0.34
                : width * 0.66 + Math.random() * width * 0.34,

            y: Math.random() * height,

            vx: (Math.random() - 0.5) * 0.12,
            vy: (Math.random() - 0.5) * 0.12,

            radius: 1.2 + Math.random() * 1.4
        };
    }

    function createParticles() {
        particles = [];

        for (let i = 0; i < PARTICLES_PER_SIDE; i++) {
            particles.push(createParticle("left"));
            particles.push(createParticle("right"));
        }
    }

    function resizeCanvas() {
        const rect = canvas.getBoundingClientRect();

        width = rect.width;
        height = rect.height;

        dpr = Math.min(window.devicePixelRatio || 1, 2);

        canvas.width = width * dpr;
        canvas.height = height * dpr;

        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

        createParticles();
    }

    function updateParticle(particle) {
        particle.x += particle.vx;
        particle.y += particle.vy;

        const onLeft = particle.x < width / 2;

        const minX = onLeft ? 0 : width * 0.64;
        const maxX = onLeft ? width * 0.36 : width;

        if (particle.x < minX || particle.x > maxX) {
            particle.vx *= -1;
        }

        if (particle.y < 0 || particle.y > height) {
            particle.vy *= -1;
        }
    }

    function drawConnection(a, b, rgb) {
        const dx = a.x - b.x;
        const dy = a.y - b.y;

        const distance = Math.sqrt(
            dx * dx +
            dy * dy
        );

        if (distance > CONNECTION_DISTANCE) return;

        const opacity =
            (1 - distance / CONNECTION_DISTANCE) * 0.22;

        ctx.beginPath();

        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);

        ctx.strokeStyle =
            `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${opacity})`;

        ctx.lineWidth = 0.8;

        ctx.stroke();
    }

    function drawParticle(particle, rgb) {
        ctx.beginPath();

        ctx.arc(
            particle.x,
            particle.y,
            particle.radius,
            0,
            Math.PI * 2
        );

        ctx.fillStyle =
            `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.55)`;

        ctx.fill();
    }

    function animate() {
        ctx.clearRect(0, 0, width, height);

        const rgb = hexToRgb(accent);

        particles.forEach(updateParticle);

        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {

                const a = particles[i];
                const b = particles[j];

                const bothLeft =
                    a.x < width / 2 &&
                    b.x < width / 2;

                const bothRight =
                    a.x >= width / 2 &&
                    b.x >= width / 2;

                if (bothLeft || bothRight) {
                    drawConnection(a, b, rgb);
                }
            }
        }

        particles.forEach((particle) => {
            drawParticle(particle, rgb);
        });

        requestAnimationFrame(animate);
    }

    const themeObserver =
        new MutationObserver(() => {
            getAccentColor();
        });

    themeObserver.observe(
        document.documentElement,
        {
            attributes: true,
            attributeFilter: ["data-theme"]
        }
    );

    window.addEventListener(
        "resize",
        resizeCanvas
    );

    getAccentColor();
    resizeCanvas();
    animate();
})();