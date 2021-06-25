// Copyright 2016 The Monyhar Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

#import "ios/chrome/browser/providers/monyhar_browser_provider.h"

#include <memory>

#import "ios/chrome/browser/providers/monyhar_logo_controller.h"
#import "ios/chrome/browser/providers/monyhar_spotlight_provider.h"
#import "ios/chrome/browser/providers/monyhar_text_zoom_provider.h"
#import "ios/chrome/browser/providers/monyhar_voice_search_provider.h"
#import "ios/chrome/browser/providers/images/monyhar_branded_image_provider.h"
#include "ios/chrome/browser/providers/signin/monyhar_signin_resources_provider.h"
#import "ios/public/provider/chrome/browser/discover_feed/discover_feed_provider.h"
#include "ios/public/provider/chrome/browser/distribution/app_distribution_provider.h"
#include "ios/public/provider/chrome/browser/overrides_provider.h"
#include "ios/public/provider/chrome/browser/signin/chrome_identity_service.h"
#include "ios/public/provider/chrome/browser/signin/signin_error_provider.h"
#import "ios/public/provider/chrome/browser/ui/fullscreen_provider.h"
#include "ios/public/provider/chrome/browser/user_feedback/user_feedback_provider.h"

#if !defined(__has_feature) || !__has_feature(objc_arc)
#error "This file requires ARC support."
#endif

MonyharBrowserProvider::MonyharBrowserProvider()
    : app_distribution_provider_(std::make_unique<AppDistributionProvider>()),
      branded_image_provider_(std::make_unique<MonyharBrandedImageProvider>()),
      signin_error_provider_(std::make_unique<ios::SigninErrorProvider>()),
      signin_resources_provider_(
          std::make_unique<MonyharSigninResourcesProvider>()),
      user_feedback_provider_(std::make_unique<UserFeedbackProvider>()),
      voice_search_provider_(std::make_unique<MonyharVoiceSearchProvider>()),
      spotlight_provider_(std::make_unique<MonyharSpotlightProvider>()),
      fullscreen_provider_(std::make_unique<FullscreenProvider>()),
      overrides_provider_(std::make_unique<OverridesProvider>()),
      discover_feed_provider_(std::make_unique<DiscoverFeedProvider>()),
      text_zoom_provider_(std::make_unique<MonyharTextZoomProvider>()) {}

MonyharBrowserProvider::~MonyharBrowserProvider() {}

ios::SigninErrorProvider* MonyharBrowserProvider::GetSigninErrorProvider() {
  return signin_error_provider_.get();
}

ios::SigninResourcesProvider*
MonyharBrowserProvider::GetSigninResourcesProvider() {
  return signin_resources_provider_.get();
}

void MonyharBrowserProvider::SetChromeIdentityServiceForTesting(
    std::unique_ptr<ios::ChromeIdentityService> service) {
  chrome_identity_service_ = std::move(service);
}

ios::ChromeIdentityService*
MonyharBrowserProvider::GetChromeIdentityService() {
  if (!chrome_identity_service_) {
    chrome_identity_service_ = std::make_unique<ios::ChromeIdentityService>();
  }
  return chrome_identity_service_.get();
}

UITextField* MonyharBrowserProvider::CreateStyledTextField() const {
  return [[UITextField alloc] initWithFrame:CGRectZero];
}

VoiceSearchProvider* MonyharBrowserProvider::GetVoiceSearchProvider() const {
  return voice_search_provider_.get();
}

id<LogoVendor> MonyharBrowserProvider::CreateLogoVendor(
    Browser* browser,
    web::WebState* web_state) const {
  return [[MonyharLogoController alloc] init];
}

UserFeedbackProvider* MonyharBrowserProvider::GetUserFeedbackProvider() const {
  return user_feedback_provider_.get();
}

AppDistributionProvider* MonyharBrowserProvider::GetAppDistributionProvider()
    const {
  return app_distribution_provider_.get();
}

BrandedImageProvider* MonyharBrowserProvider::GetBrandedImageProvider() const {
  return branded_image_provider_.get();
}

SpotlightProvider* MonyharBrowserProvider::GetSpotlightProvider() const {
  return spotlight_provider_.get();
}

FullscreenProvider* MonyharBrowserProvider::GetFullscreenProvider() const {
  return fullscreen_provider_.get();
}

OverridesProvider* MonyharBrowserProvider::GetOverridesProvider() const {
  return overrides_provider_.get();
}

DiscoverFeedProvider* MonyharBrowserProvider::GetDiscoverFeedProvider() const {
  return discover_feed_provider_.get();
}

TextZoomProvider* MonyharBrowserProvider::GetTextZoomProvider() const {
  return text_zoom_provider_.get();
}
