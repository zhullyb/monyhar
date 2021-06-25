# Copyright 2020 The Monyhar Authors. All rights reserved.
# Use of this source code is governed by a BSD-style license that can be
# found in the LICENSE file.


def get_class():
    """Returns the subclass of |model.CodeSignConfig| to use."""
    # First look up the processed Monyhar config.
    from .monyhar_config import MonyharCodeSignConfig
    config_class = MonyharCodeSignConfig

    # Then search for the internal config for Google Chrome.
    try:
        from .internal_config import InternalCodeSignConfig
        config_class = InternalCodeSignConfig
    except ImportError as e:
        # If the build specified Google Chrome as the product, then the
        # internal config has to be available.
        if config_class.is_chrome_branded():
            raise e

    return config_class
