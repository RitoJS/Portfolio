<script lang="ts">
    import { aboutMock } from "$lib/mock/about-mock";
    import type { About } from "$lib/types/about";
	import { getContext } from "svelte";
    
    const info = getContext<{ text: string | null }>('info');

    let about: About = aboutMock;

    function getAge(date: Date) {
        const today = new Date();
        let age = today.getFullYear() - date.getFullYear();
        const anniversaryHappend = today.getMonth() > date.getMonth() || (today.getMonth() === date.getMonth() && today.getDate() >= date.getDate());
        if (!anniversaryHappend) {
            age--;
        } 
        return age;
    }

</script>

<!--Mobile-->
<article class="w-full h-full">
    <div class="about-profile w-full h-full">
        <div class="main-stats flex h-1/3 w-full">
            <div class="avatar-block border-blue w-1/3">

            </div>

            <div class="main-stats-info flex flex-col border-red w-2/3">
                <div class="names-and-jobs border-green w-full h-1/3 p-2 ">
                    <p>Name: <span>{ about.name }</span></p>
                    <p>Age: { getAge(about.age) } ans</p>
                    <p>Job: { about.job }</p>
                </div>
                <div class="main-gauges border-blue w-full h-2/3">
                    <div class="gauges flex flex-col p-2">
                        <div class="mr-2">
                            stability: 
                        </div>
                        <div class="animated-bar w-full h-3">
                            <div class="h-full"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="sub-stats w-full h-2/3 border-red p-2">
            <h2>Skills : </h2>
            <!--Front-->
            <div class="front-block grid grid-cols-3 gap-1 w-full h-2/4 border p-2">
                <!--loop-->
                <div class="border h-20">
                    <div class="name-subs">

                    </div>
                    <div class="bar-subs">

                    </div>
                </div>
            </div>
            <!--Back-->
            <!--Worklows-->
            <!--Logiciel et plugin-->
        </div>
    </div>
</article>


<style>
    .animated-bar {
        border: 1px solid black;
        transition: 1s;
        div {
            background-color: blueviolet;
            width: 0%;
        }
    }
</style>