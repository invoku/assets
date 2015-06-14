function pgNavig(o) {
    var m = location.href,
        l = m.indexOf("/search/label/") != -1,
        a = l ? m.substr(m.indexOf("/search/label/") + 14, m.length) : "";
    a = a.indexOf("?") != -1 ? a.substr(0, a.indexOf("?")) : a;
    var g = l ? "/search/label/" + a + "?updated-max=" : "/search?updated-max=",
        k = o.feed.entry.length,
        e = Math.ceil(k / pgNavigConf.perPage);
    if (e <= 1) {
        return
    }
    var n = 1,
        h = [""];
    l ? h.push("/search/label/" + a + "?max-results=" + pgNavigConf.perPage) : h.push("/?max-results=" + pgNavigConf.perPage);
    for (var d = 2; d <= e; d++) {
        var c = (d - 1) * pgNavigConf.perPage - 1,
            b = o.feed.entry[c].published.$t,
            f = b.substring(0, 19) + b.substring(23, 29);
        f = encodeURIComponent(f);
        if (m.indexOf(f) != -1) {
            n = d
        }
        h.push(g + f + "&max-results=" + pgNavigConf.perPage)
    }
    pgNavig.show(h, n, e)
}
pgNavig.show = function(f, e, a) {
    var d = Math.floor((pgNavigConf.numPages - 1) / 2),
        g = pgNavigConf.numPages - 1 - d,
        c = e - d;
    if (c <= 0) {
        c = 1
    }
    endPage = e + g;
    if ((endPage - c) < pgNavigConf.numPages) {
        endPage = c + pgNavigConf.numPages - 1
    }
    if (endPage > a) {
        endPage = a;
        c = a - pgNavigConf.numPages + 1
    }
    if (c <= 0) {
        c = 1
    }
    var b = '<span class="pages">Pages ' + e + ' of ' + a + "</span> ";
    if (c > 1) {
        b += '<a href="' + f[1] + '">' + pgNavigConf.firstText + "</a>"
    }
    if (e > 1) {
        b += '<a href="' + f[e - 1] + '">' + pgNavigConf.prevText + "</a>"
    }
    for (i = c; i <= endPage; ++i) {
        if (i == e) {
            b += '<span class="current">' + i + "</span>"
        } else {
            b += '<a href="' + f[i] + '">' + i + "</a>"
        }
    }
    if (e < a) {
        b += '<a href="' + f[e + 1] + '">' + pgNavigConf.nextText + "</a>"
    }
    if (endPage < a) {
        b += '<a href="' + f[a] + '">' + pgNavigConf.lastText + "</a>"
    }
    document.write(b)
};
(function() {
    var b = location.href;
    if (b.indexOf("?q=") != -1 || b.indexOf(".html") != -1) {
        return
    }
    var d = b.indexOf("/search/label/") + 14;
    if (d != 13) {
        var c = b.indexOf("?"),
            a = (c == -1) ? b.substring(d) : b.substring(d, c);
        document.write('<script type="text/javascript" src="/feeds/posts/summary/-/' + a + '?alt=json-in-script&callback=pgNavig&max-results=99999"><\/script>')
    } else {
        document.write('<script type="text/javascript" src="/feeds/posts/summary?alt=json-in-script&callback=pgNavig&max-results=99999"><\/script>')
    }
})();
