// Copyright 2011 The Closure Library Authors. All Rights Reserved.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS-IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

goog.provide('goog.ui.media.MediaModelTest');
goog.setTestOnly('goog.ui.media.MediaModelTest');

goog.require('goog.testing.jsunit');
goog.require('goog.ui.media.MediaModel');


/**
 * A simple model used in many tests.
 */
var model;

function setUp() {
  model = new goog.ui.media.MediaModel(
      'http://url.com', 'a caption', 'a description');
}

function testMediaModel() {
  assertEquals('http://url.com', model.getUrl());
  assertEquals('a caption', model.getCaption());
  assertEquals('a description', model.getDescription());

  var incompleteModel = new goog.ui.media.MediaModel(
      'http://foo.bar',
      undefined,
      'This media has no caption but has a description and a URL');
  assertEquals('http://foo.bar', incompleteModel.getUrl());
  assertUndefined(incompleteModel.getCaption());
  assertEquals('This media has no caption but has a description and a URL',
      incompleteModel.getDescription());
  assertArrayEquals([], incompleteModel.getThumbnails());
}

function testMediaModelFindCategoryWithScheme() {
  assertNull(model.findCategoryWithScheme('no such scheme'));

  model.setCategories([
    new goog.ui.media.MediaModel.Category('scheme-a', 'value-a'),
    new goog.ui.media.MediaModel.Category('scheme-b', 'value-b')
  ]);
  assertNull(model.findCategoryWithScheme('no such scheme'));
  assertEquals('value-a',
      model.findCategoryWithScheme('scheme-a').getValue());
  assertEquals('value-b',
      model.findCategoryWithScheme('scheme-b').getValue());
}


function testMediaModelFindCreditsWithRole() {
  assertEquals(0, model.findCreditsWithRole('no such role').length);

  model.setCredits([
    new goog.ui.media.MediaModel.Credit('value-a', 'role-a'),
    new goog.ui.media.MediaModel.Credit('value-a2', 'role-a'),
    new goog.ui.media.MediaModel.Credit('value-b', 'role-b')
  ]);

  assertEquals(0, model.findCreditsWithRole('no such role').length);
  assertEquals(2, model.findCreditsWithRole('role-a').length);
  assertEquals('value-a',
      model.findCreditsWithRole('role-a')[0].getValue());
  assertEquals('value-a2',
      model.findCreditsWithRole('role-a')[1].getValue());
  assertEquals('value-b',
      model.findCreditsWithRole('role-b')[0].getValue());
}

function testMediaModelSubtitles() {
  model.setSubTitles([
    new goog.ui.media.MediaModel.SubTitle(
        'uri', '*', 'application/tts+xml')
  ]);
  assertEquals(1, model.getSubTitles().length);
  assertEquals('uri', model.getSubTitles()[0].getHref());
  assertEquals('*', model.getSubTitles()[0].getLang());
  assertEquals('application/tts+xml', model.getSubTitles()[0].getType());
}

function testMediaModelNoSubtitles() {
  assertEquals(0, model.getSubTitles().length);
}
