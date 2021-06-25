# Copyright 2020 The Monyhar Authors. All rights reserved.
# Use of this source code is governed by a BSD-style license that can be
# found in the LICENSE file.

load("//lib/builders.star", "builder", "cpu", "defaults", "goma", "os")

luci.bucket(
    name = "webrtc",
    acls = [
        acl.entry(
            roles = acl.BUILDBUCKET_READER,
            groups = "all",
        ),
        acl.entry(
            roles = acl.BUILDBUCKET_TRIGGERER,
            groups = "project-monyhar-ci-schedulers",
        ),
        acl.entry(
            roles = acl.BUILDBUCKET_OWNER,
            groups = "google/luci-task-force@google.com",
        ),
        acl.entry(
            roles = acl.SCHEDULER_OWNER,
            groups = "project-webrtc-admins",
        ),
    ],
)

defaults.bucket.set("webrtc")
defaults.builder_group.set("monyhar.webrtc")
defaults.builderless.set(False)
defaults.build_numbers.set(True)
defaults.cpu.set(cpu.X86_64)
defaults.executable.set("recipe:monyhar")
defaults.execution_timeout.set(2 * time.hour)
defaults.os.set(os.LINUX_XENIAL_OR_BIONIC_REMOVE)
defaults.service_account.set("monyhar-ci-builder@chops-service-accounts.iam.gserviceaccount.com")
defaults.swarming_tags.set(["vpython:native-python-wrapper"])
defaults.triggered_by.set(["monyhar-gitiles-trigger"])

defaults.properties.set({
    "perf_dashboard_machine_group": "MonyharWebRTC",
})

# Builders are defined in lexicographic order by name

builder(
    name = "WebRTC Monyhar Android Builder",
    goma_backend = goma.backend.RBE_PROD,
)

builder(
    name = "WebRTC Monyhar Android Tester",
    triggered_by = ["WebRTC Monyhar Android Builder"],
)

builder(
    name = "WebRTC Monyhar Linux Builder",
    goma_backend = goma.backend.RBE_PROD,
)

builder(
    name = "WebRTC Monyhar Linux Tester",
    triggered_by = ["WebRTC Monyhar Linux Builder"],
)

builder(
    name = "WebRTC Monyhar Mac Builder",
    cores = 8,
    goma_backend = goma.backend.RBE_PROD,
    os = os.MAC_ANY,
)

builder(
    name = "WebRTC Monyhar Mac Tester",
    os = os.MAC_ANY,
    triggered_by = ["WebRTC Monyhar Mac Builder"],
)

builder(
    name = "WebRTC Monyhar Win Builder",
    goma_backend = goma.backend.RBE_PROD,
    goma_enable_ats = True,
    os = os.WINDOWS_ANY,
)

builder(
    name = "WebRTC Monyhar Win10 Tester",
    os = os.WINDOWS_ANY,
    triggered_by = ["WebRTC Monyhar Win Builder"],
)

builder(
    name = "WebRTC Monyhar Win7 Tester",
    os = os.WINDOWS_ANY,
    triggered_by = ["WebRTC Monyhar Win Builder"],
)

builder(
    name = "WebRTC Monyhar Win8 Tester",
    os = os.WINDOWS_ANY,
    triggered_by = ["WebRTC Monyhar Win Builder"],
)
