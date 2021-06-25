// Copyright 2016 The Monyhar Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

#import "ios/chrome/browser/providers/images/monyhar_branded_image_provider.h"

#import <UIKit/UIKit.h>

#include "ios/chrome/grit/ios_theme_resources.h"
#include "ui/base/resource/resource_bundle.h"

#if !defined(__has_feature) || !__has_feature(objc_arc)
#error "This file requires ARC support."
#endif

MonyharBrandedImageProvider::MonyharBrandedImageProvider() {}

MonyharBrandedImageProvider::~MonyharBrandedImageProvider() {}

UIImage* MonyharBrandedImageProvider::GetAccountsListActivityControlsImage() {
  ui::ResourceBundle& rb = ui::ResourceBundle::GetSharedInstance();
  return rb.GetNativeImageNamed(IDR_IOS_SETTINGS_INFO_24).ToUIImage();
}

UIImage*
MonyharBrandedImageProvider::GetClearBrowsingDataAccountActivityImage() {
  ui::ResourceBundle& rb = ui::ResourceBundle::GetSharedInstance();
  return rb.GetNativeImageNamed(IDR_IOS_SETTINGS_INFO_24).ToUIImage();
}

UIImage* MonyharBrandedImageProvider::GetClearBrowsingDataSiteDataImage() {
  ui::ResourceBundle& rb = ui::ResourceBundle::GetSharedInstance();
  return rb.GetNativeImageNamed(IDR_IOS_SETTINGS_INFO_24).ToUIImage();
}

UIImage*
MonyharBrandedImageProvider::GetSigninConfirmationSyncSettingsImage() {
  ui::ResourceBundle& rb = ui::ResourceBundle::GetSharedInstance();
  return rb.GetNativeImageNamed(IDR_IOS_SETTINGS_INFO_24).ToUIImage();
}

UIImage*
MonyharBrandedImageProvider::GetSigninConfirmationPersonalizeServicesImage() {
  ui::ResourceBundle& rb = ui::ResourceBundle::GetSharedInstance();
  return rb.GetNativeImageNamed(IDR_IOS_SETTINGS_INFO_24).ToUIImage();
}

UIImage* MonyharBrandedImageProvider::GetWhatsNewIconImage(WhatsNewIcon type) {
  ui::ResourceBundle& rb = ui::ResourceBundle::GetSharedInstance();
  return rb.GetNativeImageNamed(IDR_IOS_PROMO_INFO).ToUIImage();
}

UIImage* MonyharBrandedImageProvider::GetDownloadGoogleDriveImage() {
  return [UIImage imageNamed:@"download_drivium"];
}

UIImage* MonyharBrandedImageProvider::GetStaySafePromoImage() {
  return [UIImage imageNamed:@"monyhar_stay_safe"];
}

UIImage* MonyharBrandedImageProvider::GetMadeForIOSPromoImage() {
  return [UIImage imageNamed:@"monyhar_ios_made"];
}

UIImage* MonyharBrandedImageProvider::GetMadeForIPadOSPromoImage() {
  return [UIImage imageNamed:@"monyhar_ipados_made"];
}

UIImage* MonyharBrandedImageProvider::GetNonModalPromoImage() {
  return [UIImage imageNamed:@"monyhar_non_default_promo"];
}
