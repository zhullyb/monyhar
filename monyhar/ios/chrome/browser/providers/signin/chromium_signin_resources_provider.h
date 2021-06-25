// Copyright 2016 The Monyhar Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

#ifndef IOS_CHROME_BROWSER_PROVIDERS_SIGNIN_CHROMIUM_SIGNIN_RESOURCES_PROVIDER_H_
#define IOS_CHROME_BROWSER_PROVIDERS_SIGNIN_CHROMIUM_SIGNIN_RESOURCES_PROVIDER_H_

#include "base/macros.h"
#include "ios/public/provider/chrome/browser/signin/signin_resources_provider.h"

// MonyharSigninResourcesProvider provides resources that the app expects to
// exist, even when signin is disabled.
class MonyharSigninResourcesProvider : public ios::SigninResourcesProvider {
 public:
  MonyharSigninResourcesProvider();
  ~MonyharSigninResourcesProvider() override;

  // SigninResourcesProvider implementation:
  UIImage* GetDefaultAvatar() override;
  NSString* GetLocalizedString(ios::SigninStringID string_id) override;

 private:
  DISALLOW_COPY_AND_ASSIGN(MonyharSigninResourcesProvider);
};

#endif  // IOS_CHROME_BROWSER_PROVIDERS_SIGNIN_CHROMIUM_SIGNIN_RESOURCES_PROVIDER_H_
