<script>
    import { page } from "$app/stores";

    // Get the URL of the page this was originally rendered on (our server). Store into window
    //   so that the bookmarklet will link to the bookmarklet.js, hosted by our server.
    // I think we can't use window.location.origin because that will result in our current page URL
    //   (Allocate+ timetable) being used.
    const bookmarklet_code = `
(() => {
    window.ando_generator_url = "${$page.url.origin}";

    let script = document.createElement("script");
    script.src = "${$page.url.origin}/bookmarklet.js";
    document.body.append(script);
})();
    `
        .replace(/\s+/, " ")
        .trim();
</script>

<a
    href="javascript:{bookmarklet_code}"
    id="bookmarklet"
    on:click={e => e.preventDefault()}
>
    Timetable Generator
</a>

<style>
    #bookmarklet {
        display: block;
        
        font-size: 3rem;
        color: var(--main);
        text-decoration: none;

        border: 2px solid var(--main);
        border-radius: var(--border-radius);

        width: fit-content;
        padding: 2rem;
        margin: 0.5rem;
    }
</style>
