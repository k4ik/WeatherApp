<template>
    <main>
        <div class="container">
            <img :src="src" :alt="text" class="image">
            <p class="text">{{ text }}</p>
            <form id="weatherForm" @submit="submitForm($event)">
                <input type="text" id="inputLocation" placeholder="Enter a location" v-model="locate">
                <button @click="getData()">
                    <img src="../../../public/images/search.svg" alt="search icon">
                </button>
            </form>
            <div class="data-container" v-if="show_icons">
                <div class="country">
                    <svg xmlns="http://www.w3.org/2000/svg" height="16" width="18" viewBox="0 0 576 512"><path opacity="1" fill="#1E3050" d="M384 476.1L192 421.2V35.9L384 90.8V476.1zm32-1.2V88.4L543.1 37.5c15.8-6.3 32.9 5.3 32.9 22.3V394.6c0 9.8-6 18.6-15.1 22.3L416 474.8zM15.1 95.1L160 37.2V423.6L32.9 474.5C17.1 480.8 0 469.2 0 452.2V117.4c0-9.8 6-18.6 15.1-22.3z"/></svg>
                    <p >{{ country }}</p>
                </div>
                <div class="temp">
                    <svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 512 512"><path d="M448 96a32 32 0 1 0 -64 0 32 32 0 1 0 64 0zM320 96a96 96 0 1 1 192 0A96 96 0 1 1 320 96zM144 64c-26.5 0-48 21.5-48 48V276.5c0 17.3-7.1 31.9-15.3 42.5C70.2 332.6 64 349.5 64 368c0 44.2 35.8 80 80 80s80-35.8 80-80c0-18.5-6.2-35.4-16.7-48.9c-8.2-10.6-15.3-25.2-15.3-42.5V112c0-26.5-21.5-48-48-48zM32 112C32 50.2 82.1 0 144 0s112 50.1 112 112V276.5c0 .1 .1 .3 .2 .6c.2 .6 .8 1.6 1.7 2.8c18.9 24.4 30.1 55 30.1 88.1c0 79.5-64.5 144-144 144S0 447.5 0 368c0-33.2 11.2-63.8 30.1-88.1c.9-1.2 1.5-2.2 1.7-2.8c.1-.3 .2-.5 .2-.6V112zM192 368c0 26.5-21.5 48-48 48s-48-21.5-48-48c0-20.9 13.4-38.7 32-45.3V272c0-8.8 7.2-16 16-16s16 7.2 16 16v50.7c18.6 6.6 32 24.4 32 45.3z"/></svg>
                    <p>{{ temp }}ºC</p>
                </div>
                <div class="wind">
                    <svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 512 512"><path d="M288 32c0 17.7 14.3 32 32 32h32c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32 14.3-32 32s14.3 32 32 32H352c53 0 96-43 96-96s-43-96-96-96H320c-17.7 0-32 14.3-32 32zm64 352c0 17.7 14.3 32 32 32h32c53 0 96-43 96-96s-43-96-96-96H32c-17.7 0-32 14.3-32 32s14.3 32 32 32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H384c-17.7 0-32 14.3-32 32zM128 512h32c53 0 96-43 96-96s-43-96-96-96H32c-17.7 0-32 14.3-32 32s14.3 32 32 32H160c17.7 0 32 14.3 32 32s-14.3 32-32 32H128c-17.7 0-32 14.3-32 32s14.3 32 32 32z"/></svg>
                    <p>{{ wind }} kph</p>
                </div>
                <div class="humidity">
                    <svg xmlns="http://www.w3.org/2000/svg" height="16" width="12" viewBox="0 0 384 512"><path d="M192 512C86 512 0 426 0 320C0 228.8 130.2 57.7 166.6 11.7C172.6 4.2 181.5 0 191.1 0h1.8c9.6 0 18.5 4.2 24.5 11.7C253.8 57.7 384 228.8 384 320c0 106-86 192-192 192zM96 336c0-8.8-7.2-16-16-16s-16 7.2-16 16c0 61.9 50.1 112 112 112c8.8 0 16-7.2 16-16s-7.2-16-16-16c-44.2 0-80-35.8-80-80z"/></svg>
                    <p>{{ humidity }}</p>
                </div>
            </div>
        </div>
        <Message v-show="show_message" />
    </main>
</template>

<script>
    import Message from "../../components/Message/Message.vue"

    export default {
        name: "Card",
        data() {
            return {
                locate: "",
                src: "",
                text: "",
                country: "",
                wind: "",
                humidity: "",
                temp: "",
                show_icons: false,
                show_message: false
            }
        },
        methods: {
            async submitForm(e) {
                e.preventDefault();
            },
            async getData() {
                try {
                    const req = await fetch(`https://api.weatherapi.com/v1/current.json?key=84dbd0102e614019a21133107231511&q=${this.locate}&aqi=no`);
                    const data = await req.json();

                    this.src=data.current.condition.icon;
                    this.text=data.current.condition.text;

                    this.country=data.location.country;
                    this.wind=data.current.wind_kph;
                    this.humidity=data.current.humidity;
                    this.temp=data.current.temp_c;
                    this.show_icons=true;
                } catch {
                    this.show_message=true;
                    this.locate="";

                    setTimeout(() => {
                        this.show_message=false;
                    }, 3000);
                }
            }
        },
        components: {
            Message
        }
    }
</script>

<style scoped lang="scss" src="./Card.scss" />