window.adforus.gptHelper = {
    states: {},
    observer: null,

    // 1. PPID 생성 및 관리 (수익 증대용 표준화)
    getPPID: function() {
        let p = localStorage.getItem('gpt_ppid');
        if (!p) {
            p = 'ppid_' + Math.random().toString(36).substr(2, 9) + Date.now().toString(36);
            localStorage.setItem('gpt_ppid', p);
        }
        return p;
    },

    // 2. AD 심볼 생성
    createSymbol: function(elId) {
        const el = document.createElement("div");
        el.style.cssText = "width:30px;height:15px;background:#ddd;border-radius:10px;font-size:10px;display:flex;align-items:center;justify-content:center;cursor:pointer;float:right;margin:3px 0;";
        el.innerText = "AD";
        el.onclick = () => window.open("https://www.adforus.co.kr/", "_blank");
        const target = document.getElementById(elId);
        if (target) target.prepend(el);
    },

    // 3. 통합 옵저버 초기화
    initObserver: function() {
        if (this.observer) return;
        this.observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                const id = entry.target.id;
                const state = this.states[id];
                if (state) {
                    state.isIntersecting = entry.isIntersecting;
                    if (entry.isIntersecting && state.isWaiting) {
                        state.isWaiting = false;
                        googletag.pubads().refresh([state.slot]);
                    }
                }
            });
        }, { threshold: 0.2 });
    },

    // 4. 공통 설정 (PPID, SingleRequest 등)
    commonSetup: function(pageUrl) {
        googletag.pubads().setPublisherProvidedId(this.getPPID());
        googletag.pubads().enableSingleRequest();
        if (pageUrl) googletag.pubads().set("page_url", pageUrl);
        googletag.enableServices();
    }
};
