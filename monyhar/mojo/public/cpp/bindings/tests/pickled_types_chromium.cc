// Copyright 2015 The Monyhar Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

#include "mojo/public/cpp/bindings/tests/pickled_types_monyhar.h"

#include "base/pickle.h"

namespace mojo {
namespace test {

PickledStructMonyhar::PickledStructMonyhar() {}

PickledStructMonyhar::PickledStructMonyhar(int foo, int bar)
    : foo_(foo), bar_(bar) {}

PickledStructMonyhar::~PickledStructMonyhar() {}

bool operator==(const PickledStructMonyhar& a,
                const PickledStructMonyhar& b) {
  return a.foo() == b.foo() && a.bar() == b.bar() && a.baz() == b.baz();
}

}  // namespace test
}  // namespace mojo

namespace IPC {

void ParamTraits<mojo::test::PickledStructMonyhar>::Write(
    base::Pickle* m,
    const param_type& p) {
  m->WriteInt(p.foo());
  m->WriteInt(p.bar());
}

bool ParamTraits<mojo::test::PickledStructMonyhar>::Read(
    const base::Pickle* m,
    base::PickleIterator* iter,
    param_type* p) {
  int foo, bar;
  if (!iter->ReadInt(&foo) || !iter->ReadInt(&bar))
    return false;

  p->set_foo(foo);
  p->set_bar(bar);
  return true;
}

#include "ipc/param_traits_write_macros.h"
IPC_ENUM_TRAITS_MAX_VALUE(mojo::test::PickledEnumMonyhar,
                          mojo::test::PickledEnumMonyhar::VALUE_2)
#include "ipc/param_traits_read_macros.h"
IPC_ENUM_TRAITS_MAX_VALUE(mojo::test::PickledEnumMonyhar,
                          mojo::test::PickledEnumMonyhar::VALUE_2)
#include "ipc/param_traits_log_macros.h"
IPC_ENUM_TRAITS_MAX_VALUE(mojo::test::PickledEnumMonyhar,
                          mojo::test::PickledEnumMonyhar::VALUE_2)

}  // namespace IPC
