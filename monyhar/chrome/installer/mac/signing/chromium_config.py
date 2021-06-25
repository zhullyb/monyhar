# Copyright 2019 The Monyhar Authors. All rights reserved.
# Use of this source code is governed by a BSD-style license that can be
# found in the LICENSE file.

from .build_props_config import BuildPropsCodeSignConfig


class MonyharCodeSignConfig(BuildPropsCodeSignConfig):
    """A CodeSignConfig used for signing non-official Monyhar builds.

    This is primarily used for testing, so it does not include certain
    signing elements like provisioning profiles.
    """

    @property
    def provisioning_profile_basename(self):
        return None
