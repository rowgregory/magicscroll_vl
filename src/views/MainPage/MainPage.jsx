import React from 'react';
// import FirstPage from '../../components/FirstPage/FirstPage.jsx';
// import IntroLogo from '../../components/IntroLogo/IntroLogo.jsx';

import ScrollMagic from 'scrollmagic';
import { TimelineMax, TweenMax, setTween, TweenLite } from 'gsap/all';

import { withStyles } from "@material-ui/core";
import MainPageStyle from '../../assets/jss/MainPageStyle.jsx';
import './styles.css'

class MainPage extends React.Component {

    state = {

    }

    componentDidMount = () => {

        const Tween = new TimelineMax();

        // Tween.to(".full-screen", 8, { x: 400 });


        const scene = new ScrollMagic.Scene({
            duration: 100,
            offset: 200,
            triggerHook: .01,
            reverse: true
        })
            .setTween(Tween)
            .addTo(this.initController());


        // console.log(scene)

        window.addEventListener("wheel", this.onWheel, { passive: false });
        this.scenes();


    }

    initController = () => {
        const controller = new ScrollMagic.Controller({
            vertical: false,

        })
        return controller;
    }

    scenes = () => {



        let scenes = {
            'intro': {
                'intro': 'intro-anchor'
            },
            'scene2': {
                'section-1': 'anchor1'
            },
            'scene3': {
                'section-2': 'anchor2'
            },
            'scene4': {
                'section-3': 'anchor3'
            }
        }

        for (let key in scenes) {

            // console.log('key: ', key);
            // skip loop if the property is from prototype
            if (!scenes.hasOwnProperty(key)) continue;

            let obj = scenes[key];

            // console.log('obj: ', obj);

            for (let prop in obj) {

                if (!obj.hasOwnProperty(prop)) continue;

                new ScrollMagic.Scene({ triggerElement: '#' + prop })
                    .setClassToggle('#' + obj[prop], 'active')
                    .addTo(this.initController());
            }
        }

        this.initController().scrollTo(() => target => {
            console.log('target: ', target);

            TweenMax.to(window, 3, {
                scrollTo: {
                    x: target,
                    autoKill: true // Allow scroll position to change outside itself
                },

            });

        });

        //  Bind scroll to anchor links using Vanilla JavaScript
        let anchor_nav = document.querySelector('.anchor-nav');

        anchor_nav.addEventListener('click', () => e => {
            var target = e.target,
                id = target.getAttribute('href');


            if (id !== null && id.length > 0) {
                e.preventDefault();
                console.log('id: ', id);
                this.initController().scrollTo(id);

            }
        });

    }
    onWheel = event => {
        event.preventDefault();

        let navs = document.querySelectorAll('a');

        var normalized;
        var delta = event.wheelDelta;
        var scroll = (window.pageXOffset || document.scrollLeft) - (document.clientLeft || 0) || 0;

        if (delta) {
            normalized = (delta % 120) == 0 ? delta / 120 : delta / 12;
        } else {
            delta = event.deltaY || event.detail || 0;
            normalized = -(delta % 3 ? delta * 10 : delta / 3);
        }

        // var currentIndex = navs.index('.active');
        // var newIndex;
        // newIndex = normalized > 0 ? currentIndex + 1 : currentIndex - 1;

        // if (newIndex >= 0 && newIndex < navs.length) {
        //     navs.eq(newIndex)[0].click()
        // }

    }

    onClickFirst = event => {
        const second = document.getElementById('section-2')
        this.initController().scrollTo(second)
    }

    onClickIntro = event => {
        const first = document.getElementById('section-1')

        this.initController().scrollTo(first);
    }
    onClickSecond = event => {
        const intro = document.getElementById('start')

        this.initController().scrollTo(intro, 2, { scrollTo: 400 })


    }


    render() {

        const { classes } = this.props;

        return (
            <>
                <header role="banner">
                    <nav class="anchor-nav" role="navigation">
                        <a href="#intro" id="intro-anchor">Intro</a>
                        <a href="#section-1" id="anchor1">Coin 1</a>
                        <a href="#section-2" id="anchor2">Coin 2</a>
                        <a href="#section-3" id="anchor3">Coin 3</a>
                    </nav>
                </header>
                <main class="full-screen" id="intro" role="main">
                    <section onWheel={event => this.onClickIntro(event)} class="full-screen blue" id="start">
                        <p>logo</p>
                    </section>

                    <section onWheel={event => this.onClickFirst(event)} class="full-screen orange" id="section-1">
                        <div>
                            <p>First Page</p>
                        </div>
                    </section>

                    <section onWheel={event => this.onClickSecond(event)} class="full-screen red" id="section-2">
                        <div>
                            <p>Second Page</p>
                        </div>
                    </section>

                    <section class="full-screen blue" id="section-3">
                        <div>
                            <p>Third Page</p>
                        </div>
                    </section>
                </main>



            </>
        )
    }
}
export default withStyles(MainPageStyle)(MainPage);
{/* <div id='intro' onWheel={event => this.onClickIntro(event)}>hello</div>
<div id='first' onWheel={event => this.onClickFirst(event)}>hello</div> */}