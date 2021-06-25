# Copyright 2020 The Monyhar Authors. All rights reserved.
# Use of this source code is governed by a BSD-style license that can be
# found in the LICENSE file.

load("//console-header.star", "HEADER")

luci.console_view(
    name = "monyhar.webrtc.fyi",
    header = HEADER,
    repo = "https://webrtc.googlesource.com/src",
    entries = [
        luci.console_view_entry(
            builder = "webrtc.fyi/WebRTC Monyhar FYI Android Builder (dbg)",
            category = "android|debug|builder",
            short_name = "32",
        ),
        luci.console_view_entry(
            builder = "webrtc.fyi/WebRTC Monyhar FYI Android Builder ARM64 (dbg)",
            category = "android|debug|builder",
            short_name = "64",
        ),
        luci.console_view_entry(
            builder = "webrtc.fyi/WebRTC Monyhar FYI Android Tests (dbg) (L Nexus5)",
            category = "android|debug|tester",
            short_name = "L",
        ),
        luci.console_view_entry(
            builder = "webrtc.fyi/WebRTC Monyhar FYI Android Tests (dbg) (M Nexus5X)",
            category = "android|debug|tester",
            short_name = "M",
        ),
        luci.console_view_entry(
            builder = "webrtc.fyi/WebRTC Monyhar FYI Android Builder",
            category = "android|release",
            short_name = "32",
        ),
        luci.console_view_entry(
            builder = "webrtc.fyi/WebRTC Monyhar FYI Linux Builder (dbg)",
            category = "linux|debug",
            short_name = "bld",
        ),
        luci.console_view_entry(
            builder = "webrtc.fyi/WebRTC Monyhar FYI Linux Builder",
            category = "linux|release",
            short_name = "bld",
        ),
        luci.console_view_entry(
            builder = "webrtc.fyi/WebRTC Monyhar FYI Linux Tester",
            category = "linux|release",
            short_name = "tst",
        ),
        luci.console_view_entry(
            builder = "webrtc.fyi/WebRTC Monyhar FYI Mac Builder (dbg)",
            category = "mac|debug",
            short_name = "bld",
        ),
        luci.console_view_entry(
            builder = "webrtc.fyi/WebRTC Monyhar FYI Mac Builder",
            category = "mac|release",
            short_name = "bld",
        ),
        luci.console_view_entry(
            builder = "webrtc.fyi/WebRTC Monyhar FYI Mac Tester",
            category = "mac|release",
            short_name = "tst",
        ),
        luci.console_view_entry(
            builder = "webrtc.fyi/WebRTC Monyhar FYI Win Builder (dbg)",
            category = "win|debug",
            short_name = "bld",
        ),
        luci.console_view_entry(
            builder = "webrtc.fyi/WebRTC Monyhar FYI Win Builder",
            category = "win|release|builder",
            short_name = "32",
        ),
        luci.console_view_entry(
            builder = "webrtc.fyi/WebRTC Monyhar FYI Win10 Tester",
            category = "win|release|tester",
            short_name = "10",
        ),
        luci.console_view_entry(
            builder = "webrtc.fyi/WebRTC Monyhar FYI Win7 Tester",
            category = "win|release|tester",
            short_name = "7",
        ),
        luci.console_view_entry(
            builder = "webrtc.fyi/WebRTC Monyhar FYI Win8 Tester",
            category = "win|release|tester",
            short_name = "8",
        ),
        luci.console_view_entry(
            builder = "webrtc.fyi/WebRTC Monyhar FYI ios-device",
            category = "ios",
            short_name = "dev",
        ),
        luci.console_view_entry(
            builder = "webrtc.fyi/WebRTC Monyhar FYI ios-simulator",
            category = "ios",
            short_name = "sim",
        ),
    ],
)
