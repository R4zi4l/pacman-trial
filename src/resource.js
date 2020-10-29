/****************************************************************************
 Copyright (c) 2017-2018 Xiamen Yaji Software Co., Ltd.
 
 http://www.cocos2d-x.org
 
 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:
 
 The above copyright notice and this permission notice shall be included in
 all copies or substantial portions of the Software.
 
 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 THE SOFTWARE.
 ****************************************************************************/

var res = {
    default_level_tileset_png: "res/default_level_tileset.png",

    default_level_tilemap_tmx: "res/default_level_tilemap.tmx",
    default_level_background_png: "res/default_level_background.png",

    road_to_rome_tilemap_tmx: "res/road_to_rome_tilemap.tmx",
    road_to_rome_background_png: "res/road_to_rome_background.png",

    actors_plist: "res/actors.plist",
    actors_png: "res/actors.png",

    death_1_sound: "res/death_1.mp3",
    death_2_sound: "res/death_2.mp3",
    eat_fruit_sound: "res/eat_fruit.mp3",
    eat_ghost_sound: "res/eat_ghost.mp3",
    munch_1_sound: "res/munch_1.mp3",
    munch_2_sound: "res/munch_2.mp3",
    power_pellet_sound: "res/power_pellet.mp3",
    retreating_sound: "res/retreating.mp3",
    siren_1_sound: "res/siren_1.mp3",

};

var g_resources = [];
for (var i in res) {
    g_resources.push(res[i]);
}
