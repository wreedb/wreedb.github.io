// Populate the sidebar
//
// This is a script, and not included directly in the page, to control the total size of the book.
// The TOC contains an entry for each page, so if each page includes a copy of the TOC,
// the total size of the page becomes O(n**2).
class MDBookSidebarScrollbox extends HTMLElement {
    constructor() {
        super();
    }
    connectedCallback() {
        this.innerHTML = '<ol class="chapter"><li class="chapter-item expanded "><a href="home.html"><strong aria-hidden="true">1.</strong> Home</a></li><li class="chapter-item expanded "><a href="about.html"><strong aria-hidden="true">2.</strong> About</a></li><li class="chapter-item expanded "><a href="background.html"><strong aria-hidden="true">3.</strong> Background</a></li><li class="chapter-item expanded "><a href="implementations.html"><strong aria-hidden="true">4.</strong> Implementations</a></li><li class="chapter-item expanded "><a href="spec-index.html"><strong aria-hidden="true">5.</strong> Specification</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="spec/values-index.html"><strong aria-hidden="true">5.1.</strong> Values</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="spec/values/strings.html"><strong aria-hidden="true">5.1.1.</strong> Strings</a></li><li class="chapter-item expanded "><a href="spec/values/numbers.html"><strong aria-hidden="true">5.1.2.</strong> Numbers</a></li><li class="chapter-item expanded "><a href="spec/values/bools.html"><strong aria-hidden="true">5.1.3.</strong> Booleans</a></li><li class="chapter-item expanded "><a href="spec/values/null.html"><strong aria-hidden="true">5.1.4.</strong> Null</a></li><li class="chapter-item expanded "><a href="spec/values/maps.html"><strong aria-hidden="true">5.1.5.</strong> Maps</a></li><li class="chapter-item expanded "><a href="spec/values/lists.html"><strong aria-hidden="true">5.1.6.</strong> Lists</a></li></ol></li><li class="chapter-item expanded "><a href="spec/structure-index.html"><strong aria-hidden="true">5.2.</strong> Structure</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="spec/structure/document.html"><strong aria-hidden="true">5.2.1.</strong> Document</a></li><li class="chapter-item expanded "><a href="spec/structure/operators.html"><strong aria-hidden="true">5.2.2.</strong> Operators</a></li><li class="chapter-item expanded "><a href="spec/structure/elements.html"><strong aria-hidden="true">5.2.3.</strong> Elements</a></li><li class="chapter-item expanded "><a href="spec/structure/identifiers.html"><strong aria-hidden="true">5.2.4.</strong> Identifiers</a></li><li class="chapter-item expanded "><a href="spec/structure/fields.html"><strong aria-hidden="true">5.2.5.</strong> Fields</a></li><li class="chapter-item expanded "><a href="spec/structure/whitespace.html"><strong aria-hidden="true">5.2.6.</strong> Whitespace</a></li><li class="chapter-item expanded "><a href="spec/structure/comments.html"><strong aria-hidden="true">5.2.7.</strong> Comments</a></li></ol></li></ol></li><li class="chapter-item expanded "><a href="formal-grammars.html"><strong aria-hidden="true">6.</strong> Formal Grammars</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="formal-grammars/ABNF.html"><strong aria-hidden="true">6.1.</strong> ABNF Format</a></li><li class="chapter-item expanded "><a href="formal-grammars/EBNF.html"><strong aria-hidden="true">6.2.</strong> EBNF Format</a></li></ol></li><li class="chapter-item expanded "><a href="gotchas.html"><strong aria-hidden="true">7.</strong> Gotchas</a></li><li class="chapter-item expanded "><a href="examples.html"><strong aria-hidden="true">8.</strong> Examples</a></li><li class="chapter-item expanded "><a href="contact.html"><strong aria-hidden="true">9.</strong> Contact</a></li><li class="chapter-item expanded "><a href="license.html"><strong aria-hidden="true">10.</strong> License</a></li></ol>';
        // Set the current, active page, and reveal it if it's hidden
        let current_page = document.location.href.toString().split("#")[0].split("?")[0];
        if (current_page.endsWith("/")) {
            current_page += "index.html";
        }
        var links = Array.prototype.slice.call(this.querySelectorAll("a"));
        var l = links.length;
        for (var i = 0; i < l; ++i) {
            var link = links[i];
            var href = link.getAttribute("href");
            if (href && !href.startsWith("#") && !/^(?:[a-z+]+:)?\/\//.test(href)) {
                link.href = path_to_root + href;
            }
            // The "index" page is supposed to alias the first chapter in the book.
            if (link.href === current_page || (i === 0 && path_to_root === "" && current_page.endsWith("/index.html"))) {
                link.classList.add("active");
                var parent = link.parentElement;
                if (parent && parent.classList.contains("chapter-item")) {
                    parent.classList.add("expanded");
                }
                while (parent) {
                    if (parent.tagName === "LI" && parent.previousElementSibling) {
                        if (parent.previousElementSibling.classList.contains("chapter-item")) {
                            parent.previousElementSibling.classList.add("expanded");
                        }
                    }
                    parent = parent.parentElement;
                }
            }
        }
        // Track and set sidebar scroll position
        this.addEventListener('click', function(e) {
            if (e.target.tagName === 'A') {
                sessionStorage.setItem('sidebar-scroll', this.scrollTop);
            }
        }, { passive: true });
        var sidebarScrollTop = sessionStorage.getItem('sidebar-scroll');
        sessionStorage.removeItem('sidebar-scroll');
        if (sidebarScrollTop) {
            // preserve sidebar scroll position when navigating via links within sidebar
            this.scrollTop = sidebarScrollTop;
        } else {
            // scroll sidebar to current active section when navigating via "next/previous chapter" buttons
            var activeSection = document.querySelector('#sidebar .active');
            if (activeSection) {
                activeSection.scrollIntoView({ block: 'center' });
            }
        }
        // Toggle buttons
        var sidebarAnchorToggles = document.querySelectorAll('#sidebar a.toggle');
        function toggleSection(ev) {
            ev.currentTarget.parentElement.classList.toggle('expanded');
        }
        Array.from(sidebarAnchorToggles).forEach(function (el) {
            el.addEventListener('click', toggleSection);
        });
    }
}
window.customElements.define("mdbook-sidebar-scrollbox", MDBookSidebarScrollbox);
