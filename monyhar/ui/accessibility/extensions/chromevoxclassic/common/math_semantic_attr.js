// Copyright 2014 The Monyhar Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

/**
 * @fileoverview Semantic attributes of Math symbols and expressions.
 *
 * This file contains the basic functionality to lookup and assign semantic
 * attributes for mathematical expressions. Since there is no such thing as a
 * well-defined semantics for all of mathematics we compute a default semantics
 * that closely models mathematical expressions found in K-12 mathematics as
 * well as in general undergraduate curriculum (i.e., calculus, linear algebra,
 * etc).
 *
 * Currently semantic attributes of symbols consist of the following two parts:
 *
 * type -- An unmutable property of an expression, regardless of its position in
 *         the math expression. For example, the letter 'f' will always have the
 *         type identifier, regardless of its use in context, e.g. as function
 *         symbol or variable.
 *
 * role -- A mutable description of the role an expression plays in the context
 *         of the overall mathematical expression. For instance, the symbol '|'
 *         is of type punctuation, but depending on context it has the role of a
 *         neutral fence or of a single vertical bar.
 *
 * In addition for some symbols we record the font as a further attribute.
 *
 * When a semantically interpreted expression is transformed into a XML
 * representation, types become tag names, while role, font, etc. are added as
 * attributes.
 *
 * This file is part of the content script as we do not want to call out to the
 * background page every time we need to look up the semantic of a symbol.
 *
 * TODO (sorge) Move semantic tree translation into the background page
 *    alongside MathJax.
 *
 */

goog.provide('cvox.SemanticAttr');

goog.require('cvox.SemanticUtil');


/**
 * Contains the basic mappings of characters/symbols and functions to semantic
 * attributes.
 *
 * Observe that all characters are given as hex code number in order to ease the
 * comparison with those in the JSON files that define speech rules per
 * character.
 * @constructor
 */
cvox.SemanticAttr = function() {
  // Punctuation Characters.
  /**
   * @type {Array<string>}
   */
  this.generalPunctuations =
      [
        '!', '"', '#', '%', '&', '\'', '*', ',', ':', ';', '?', '@', '\\',
        '¡', '§', '¶', '·', '¿', '‗', '†', '‡', '•', '‣', '․', '‥', '‧',
        '‰', '‱', '‸', '※', '‼', '‽', '‾', '⁁', '⁂', '⁃', '⁇', '⁈', '⁉',
        '⁋', '⁌', '⁍', '⁎', '⁏', '⁐', '⁑', '⁓', '⁕', '⁖', '⁘', '⁙', '⁚',
        '⁛', '⁜', '⁝', '⁞', '︐', '︓', '︔', '︕', '︖', '︰', '﹅', '﹆',
        '﹉', '﹊', '﹋', '﹌', '﹐', '﹔', '﹕', '﹖', '﹗', '﹟', '﹠', '﹡', '﹨',
        '﹪', '﹫', '！', '＂', '＃', '％', '＆', '＇', '＊', '，', '／', '：',
        '；', '？', '＠', '＼'
      ];
  /**
   * @type {string}
   * @private
   */
  this.invisibleComma_ = cvox.SemanticUtil.numberToUnicode(0x2063);
  this.generalPunctuations.push(this.invisibleComma_);
  /**
   * @type {Array<string>}
   */
  this.ellipses =
      [
        '…', '⋮', '⋯', '⋰', '⋱', '︙'
      ];
  /**
   * @type {Array<string>}
   */
  this.fullStops =
      [
        '.', '﹒', '．'
      ];
  /**
   * @type {Array<string>}
   */
  this.dashes =
      [
        '‒', '–', '—', '―', '〜', '︱', '︲', '﹘'
      ];
  /**
   * @type {Array<string>}
   */
  this.primes =
      [
        '′', '″', '‴', '‵', '‶', '‷', '⁗'
      ];

  // Fences.
  // Fences are treated slightly differently from other symbols as we want to
  // record pairs of opening/closing and top/bottom fences.
  /**
   * Mapping opening to closing fences.
   * @type {Object<string>}
   */
  this.openClosePairs =
      {
        // Unicode categories Ps and Pe.
        // Observe that left quotation 301D could also be matched to 301F,
        // but is currently matched to 301E.
        '(': ')', '[': ']', '{': '}', '⁅': '⁆', '〈': '〉', '❨': '❩',
        '❪': '❫', '❬': '❭', '❮': '❯', '❰': '❱', '❲': '❳', '❴': '❵',
        '⟅': '⟆', '⟦': '⟧', '⟨': '⟩', '⟪': '⟫', '⟬': '⟭', '⟮': '⟯',
        '⦃': '⦄', '⦅': '⦆', '⦇': '⦈', '⦉': '⦊', '⦋': '⦌', '⦍': '⦎',
        '⦏': '⦐', '⦑': '⦒', '⦓': '⦔', '⦕': '⦖', '⦗': '⦘', '⧘': '⧙',
        '⧚': '⧛', '⧼': '⧽', '⸢': '⸣', '⸤': '⸥', '⸦': '⸧', '⸨': '⸩',
        '〈': '〉', '《': '》', '「': '」', '『': '』', '【': '】',
        '〔': '〕', '〖': '〗', '〘': '〙', '〚': '〛', '〝': '〞',
        '﴾': '﴿', '︗': '︘', '﹙': '﹚', '﹛': '﹜', '﹝': '﹞', '（': '）',
        '［': '］', '｛': '｝', '｟': '｠', '｢': '｣',
        // Unicode categories Sm and So.
        '⌈': '⌉', '⌊': '⌋', '⌌': '⌍', '⌎': '⌏', '⌜': '⌝', '⌞': '⌟',
        // Extender fences.
        // Parenthesis.
        '⎛': '⎞', '⎜': '⎟', '⎝': '⎠',
        // Square bracket.
        '⎡': '⎤', '⎢': '⎥', '⎣': '⎦',
        // Curly bracket.
        '⎧': '⎫', '⎨': '⎬', '⎩': '⎭', '⎰': '⎱', '⎸': '⎹'
      };
  /**
   * Mapping top to bottom fences.
   * @type {Object<string>}
   */
  this.topBottomPairs =
      {
        '⎴': '⎵', '⏜': '⏝', '⏞': '⏟', '⏠': '⏡', '︵': '︶', '︷': '︸',
        '︹': '︺', '︻': '︼', '︽': '︾', '︿': '﹀', '﹁': '﹂',
        '﹃': '﹄', '﹇': '﹈'
      };
  /**
   * @type {Array<string>}
   */
  this.leftFences = cvox.SemanticUtil.objectsToKeys(this.openClosePairs);
  /**
   * @type {Array<string>}
   */
  this.rightFences = cvox.SemanticUtil.objectsToValues(this.openClosePairs);
  this.rightFences.push('〟');
  /**
   * @type {Array<string>}
   */
  this.topFences = cvox.SemanticUtil.objectsToKeys(this.topBottomPairs);
  /**
   * @type {Array<string>}
   */
  this.bottomFences = cvox.SemanticUtil.objectsToValues(this.topBottomPairs);
  /**
   * @type {Array<string>}
   */
  this.neutralFences =
      [
        '|', '¦', '‖', '❘', '⦀', '⫴', '￤', '｜'
      ];
  /** Array of all fences.
   * @type {Array<string>}
   */
  this.fences = this.neutralFences.concat(
      this.leftFences, this.rightFences, this.topFences, this.bottomFences);

  // Identifiers.
  // Latin Alphabets.
  /**
   * @type {Array<string>}
   */
  this.capitalLatin =
      [
        'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M',
        'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'
      ];
  /**
   * @type {Array<string>}
   */
  this.smallLatin =
      [
        'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm',
        'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
        // dotless i and j.
        'ı', 'ȷ'
      ];
  /**
   * @type {Array<string>}
   */
  this.capitalLatinFullWidth =
      [
        'Ａ', 'Ｂ', 'Ｃ', 'Ｄ', 'Ｅ', 'Ｆ', 'Ｇ', 'Ｈ', 'Ｉ', 'Ｊ', 'Ｋ', 'Ｌ', 'Ｍ',
       'Ｎ', 'Ｏ', 'Ｐ', 'Ｑ', 'Ｒ', 'Ｓ', 'Ｔ', 'Ｕ', 'Ｖ', 'Ｗ', 'Ｘ', 'Ｙ', 'Ｚ'
      ];
  /**
   * @type {Array<string>}
   */
  this.smallLatinFullWidth =
      [
        'ａ', 'ｂ', 'ｃ', 'ｄ', 'ｅ', 'ｆ', 'ｇ', 'ｈ', 'ｉ', 'ｊ', 'ｋ', 'ｌ', 'ｍ',
        'ｎ', 'ｏ', 'ｐ', 'ｑ', 'ｒ', 'ｓ', 'ｔ', 'ｕ', 'ｖ', 'ｗ', 'ｘ', 'ｙ', 'ｚ'
      ];
  /**
   * @type {Array<string>}
   */
  this.capitalLatinBold =
      [
        '𝐀', '𝐁', '𝐂', '𝐃', '𝐄', '𝐅', '𝐆', '𝐇', '𝐈', '𝐉', '𝐊', '𝐋', '𝐌',
       '𝐍', '𝐎', '𝐏', '𝐐', '𝐑', '𝐒', '𝐓', '𝐔', '𝐕', '𝐖', '𝐗', '𝐘', '𝐙'
        ];
  /**
   * @type {Array<string>}
   */
  this.smallLatinBold =
      [
        '𝐚', '𝐛', '𝐜', '𝐝', '𝐞', '𝐟', '𝐠', '𝐡', '𝐢', '𝐣', '𝐤', '𝐥', '𝐦',
       '𝐧', '𝐨', '𝐩', '𝐪', '𝐫', '𝐬', '𝐭', '𝐮', '𝐯', '𝐰', '𝐱', '𝐲', '𝐳'
        ];
  /**
   * @type {Array<string>}
   */
  this.capitalLatinItalic =
      [
        '𝐴', '𝐵', '𝐶', '𝐷', '𝐸', '𝐹', '𝐺', '𝐻', '𝐼', '𝐽', '𝐾', '𝐿', '𝑀',
       '𝑁', '𝑂', '𝑃', '𝑄', '𝑅', '𝑆', '𝑇', '𝑈', '𝑉', '𝑊', '𝑋', '𝑌', '𝑍'
        ];
  /**
   * @type {Array<string>}
   */
  this.smallLatinItalic =
      [
        '𝑎', '𝑏', '𝑐', '𝑑', '𝑒', '𝑓', '𝑔', 'ℎ', '𝑖', '𝑗', '𝑘', '𝑙', '𝑚',
       '𝑛', '𝑜', '𝑝', '𝑞', '𝑟', '𝑠', '𝑡', '𝑢', '𝑣', '𝑤', '𝑥', '𝑦', '𝑧',
       // dotless i and j.
       '𝚤', '𝚥'
        ];
  /**
   * @type {Array<string>}
   */
  this.capitalLatinScript =
      [
        '𝒜', 'ℬ', '𝒞', '𝒟', 'ℰ', 'ℱ', '𝒢', 'ℋ', 'ℐ', '𝒥', '𝒦', 'ℒ', 'ℳ',
       '𝒩', '𝒪', '𝒫', '𝒬', 'ℛ', '𝒮', '𝒯', '𝒰', '𝒱', '𝒲', '𝒳', '𝒴', '𝒵',
       // Powerset Cap P.
       '℘'
        ];
  /**
   * @type {Array<string>}
   */
  this.smallLatinScript =
      [
        '𝒶', '𝒷', '𝒸', '𝒹', 'ℯ', '𝒻', 'ℊ', '𝒽', '𝒾', '𝒿', '𝓀', '𝓁', '𝓂',
       '𝓃', 'ℴ', '𝓅', '𝓆', '𝓇', '𝓈', '𝓉', '𝓊', '𝓋', '𝓌', '𝓍', '𝓎', '𝓏',
       // script small l
       'ℓ'
        ];
  /**
   * @type {Array<string>}
   */
  this.capitalLatinBoldScript =
      [
        '𝓐', '𝓑', '𝓒', '𝓓', '𝓔', '𝓕', '𝓖', '𝓗', '𝓘', '𝓙', '𝓚', '𝓛', '𝓜',
       '𝓝', '𝓞', '𝓟', '𝓠', '𝓡', '𝓢', '𝓣', '𝓤', '𝓥', '𝓦', '𝓧', '𝓨', '𝓩'
        ];
  /**
   * @type {Array<string>}
   */
  this.smallLatinBoldScript =
      [
        '𝓪', '𝓫', '𝓬', '𝓭', '𝓮', '𝓯', '𝓰', '𝓱', '𝓲', '𝓳', '𝓴', '𝓵', '𝓶',
       '𝓷', '𝓸', '𝓹', '𝓺', '𝓻', '𝓼', '𝓽', '𝓾', '𝓿', '𝔀', '𝔁', '𝔂', '𝔃'
        ];
  /**
   * @type {Array<string>}
   */
  this.capitalLatinFraktur =
      [
        '𝔄', '𝔅', 'ℭ', '𝔇', '𝔈', '𝔉', '𝔊', 'ℌ', 'ℑ', '𝔍', '𝔎', '𝔏', '𝔐',
       '𝔑', '𝔒', '𝔓', '𝔔', 'ℜ', '𝔖', '𝔗', '𝔘', '𝔙', '𝔚', '𝔛', '𝔜', 'ℨ'
        ];
  /**
   * @type {Array<string>}
   */
  this.smallLatinFraktur =
      [
        '𝔞', '𝔟', '𝔠', '𝔡', '𝔢', '𝔣', '𝔤', '𝔥', '𝔦', '𝔧', '𝔨', '𝔩', '𝔪',
       '𝔫', '𝔬', '𝔭', '𝔮', '𝔯', '𝔰', '𝔱', '𝔲', '𝔳', '𝔴', '𝔵', '𝔶', '𝔷'
        ];
  /**
   * @type {Array<string>}
   */
  this.capitalLatinDoubleStruck =
      [
        '𝔸', '𝔹', 'ℂ', '𝔻', '𝔼', '𝔽', '𝔾', 'ℍ', '𝕀', '𝕁', '𝕂', '𝕃', '𝕄',
       'ℕ', '𝕆', 'ℙ', 'ℚ', 'ℝ', '𝕊', '𝕋', '𝕌', '𝕍', '𝕎', '𝕏', '𝕐', 'ℤ'
        ];
  /**
   * @type {Array<string>}
   */
  this.smallLatinDoubleStruck =
      [
        '𝕒', '𝕓', '𝕔', '𝕕', '𝕖', '𝕗', '𝕘', '𝕙', '𝕚', '𝕛', '𝕜', '𝕝', '𝕞',
       '𝕟', '𝕠', '𝕡', '𝕢', '𝕣', '𝕤', '𝕥', '𝕦', '𝕧', '𝕨', '𝕩', '𝕪', '𝕫'
        ];
  /**
   * @type {Array<string>}
   */
  this.capitalLatinBoldFraktur =
      [
        '𝕬', '𝕭', '𝕮', '𝕯', '𝕰', '𝕱', '𝕲', '𝕳', '𝕴', '𝕵', '𝕶', '𝕷', '𝕸',
       '𝕹', '𝕺', '𝕻', '𝕼', '𝕽', '𝕾', '𝕿', '𝖀', '𝖁', '𝖂', '𝖃', '𝖄', '𝖅'
        ];
  /**
   * @type {Array<string>}
   */
  this.smallLatinBoldFraktur =
      [
        '𝖆', '𝖇', '𝖈', '𝖉', '𝖊', '𝖋', '𝖌', '𝖍', '𝖎', '𝖏', '𝖐', '𝖑', '𝖒',
       '𝖓', '𝖔', '𝖕', '𝖖', '𝖗', '𝖘', '𝖙', '𝖚', '𝖛', '𝖜', '𝖝', '𝖞', '𝖟'
        ];
  /**
   * @type {Array<string>}
   */
  this.capitalLatinSansSerif =
      [
        '𝖠', '𝖡', '𝖢', '𝖣', '𝖤', '𝖥', '𝖦', '𝖧', '𝖨', '𝖩', '𝖪', '𝖫', '𝖬',
       '𝖭', '𝖮', '𝖯', '𝖰', '𝖱', '𝖲', '𝖳', '𝖴', '𝖵', '𝖶', '𝖷', '𝖸', '𝖹'
        ];
  /**
   * @type {Array<string>}
   */
  this.smallLatinSansSerif =
      [
        '𝖺', '𝖻', '𝖼', '𝖽', '𝖾', '𝖿', '𝗀', '𝗁', '𝗂', '𝗃', '𝗄', '𝗅', '𝗆',
       '𝗇', '𝗈', '𝗉', '𝗊', '𝗋', '𝗌', '𝗍', '𝗎', '𝗏', '𝗐', '𝗑', '𝗒', '𝗓'
        ];
  /**
   * @type {Array<string>}
   */
  this.capitalLatinSansSerifBold =
      [
        '𝗔', '𝗕', '𝗖', '𝗗', '𝗘', '𝗙', '𝗚', '𝗛', '𝗜', '𝗝', '𝗞', '𝗟', '𝗠',
       '𝗡', '𝗢', '𝗣', '𝗤', '𝗥', '𝗦', '𝗧', '𝗨', '𝗩', '𝗪', '𝗫', '𝗬', '𝗭'
        ];
  /**
   * @type {Array<string>}
   */
  this.smallLatinSansSerifBold =
      [
        '𝗮', '𝗯', '𝗰', '𝗱', '𝗲', '𝗳', '𝗴', '𝗵', '𝗶', '𝗷', '𝗸', '𝗹', '𝗺',
       '𝗻', '𝗼', '𝗽', '𝗾', '𝗿', '𝘀', '𝘁', '𝘂', '𝘃', '𝘄', '𝘅', '𝘆', '𝘇'
        ];
  /**
   * @type {Array<string>}
   */
  this.capitalLatinSansSerifItalic =
      [
        '𝘈', '𝘉', '𝘊', '𝘋', '𝘌', '𝘍', '𝘎', '𝘏', '𝘐', '𝘑', '𝘒', '𝘓', '𝘔',
       '𝘕', '𝘖', '𝘗', '𝘘', '𝘙', '𝘚', '𝘛', '𝘜', '𝘝', '𝘞', '𝘟', '𝘠', '𝘡'
        ];
  /**
   * @type {Array<string>}
   */
  this.smallLatinSansSerifItalic =
      [
        '𝘢', '𝘣', '𝘤', '𝘥', '𝘦', '𝘧', '𝘨', '𝘩', '𝘪', '𝘫', '𝘬', '𝘭', '𝘮',
       '𝘯', '𝘰', '𝘱', '𝘲', '𝘳', '𝘴', '𝘵', '𝘶', '𝘷', '𝘸', '𝘹', '𝘺', '𝘻'
        ];
  /**
   * @type {Array<string>}
   */
  this.capitalLatinMonospace =
      [
        '𝙰', '𝙱', '𝙲', '𝙳', '𝙴', '𝙵', '𝙶', '𝙷', '𝙸', '𝙹', '𝙺', '𝙻', '𝙼',
       '𝙽', '𝙾', '𝙿', '𝚀', '𝚁', '𝚂', '𝚃', '𝚄', '𝚅', '𝚆', '𝚇', '𝚈', '𝚉'
        ];
  /**
   * @type {Array<string>}
   */
  this.smallLatinMonospace =
      [
        '𝚊', '𝚋', '𝚌', '𝚍', '𝚎', '𝚏', '𝚐', '𝚑', '𝚒', '𝚓', '𝚔', '𝚕', '𝚖',
       '𝚗', '𝚘', '𝚙', '𝚚', '𝚛', '𝚜', '𝚝', '𝚞', '𝚟', '𝚠', '𝚡', '𝚢', '𝚣'
        ];
  /**
   * @type {Array<string>}
   */
  this.latinDoubleStruckItalic =
      [
        'ⅅ', 'ⅆ', 'ⅇ', 'ⅈ', 'ⅉ'
        ];

  // Greek Alphabets
  /**
   * @type {Array<string>}
   */
  this.capitalGreek =
      [
        'Α', 'Β', 'Γ', 'Δ', 'Ε', 'Ζ', 'Η', 'Θ', 'Ι', 'Κ', 'Λ', 'Μ', 'Ν',
       'Ξ', 'Ο', 'Π', 'Ρ', 'Σ', 'Τ', 'Υ', 'Φ', 'Χ', 'Ψ', 'Ω'
        ];
  /**
   * @type {Array<string>}
   */
  this.smallGreek =
      [
        'α', 'β', 'γ', 'δ', 'ε', 'ζ', 'η', 'θ', 'ι', 'κ', 'λ', 'μ', 'ν',
       'ξ', 'ο', 'π', 'ρ', 'ς', 'σ', 'τ', 'υ', 'φ', 'χ', 'ψ', 'ω'
        ];
  /**
   * @type {Array<string>}
   */
  this.capitalGreekBold =
      [
        '𝚨', '𝚩', '𝚪', '𝚫', '𝚬', '𝚭', '𝚮', '𝚯', '𝚰', '𝚱', '𝚲', '𝚳', '𝚴',
       '𝚵', '𝚶', '𝚷', '𝚸', '𝚺', '𝚻', '𝚼', '𝚽', '𝚾', '𝚿', '𝛀'
        ];
  /**
   * @type {Array<string>}
   */
  this.smallGreekBold =
      [
        '𝛂', '𝛃', '𝛄', '𝛅', '𝛆', '𝛇', '𝛈', '𝛉', '𝛊', '𝛋', '𝛌', '𝛍', '𝛎',
       '𝛏', '𝛐', '𝛑', '𝛒', '𝛓', '𝛔', '𝛕', '𝛖', '𝛗', '𝛘', '𝛙', '𝛚'
        ];
  /**
   * @type {Array<string>}
   */
  this.capitalGreekItalic =
      [
        '𝛢', '𝛣', '𝛤', '𝛥', '𝛦', '𝛧', '𝛨', '𝛩', '𝛪', '𝛫', '𝛬', '𝛭', '𝛮',
       '𝛯', '𝛰', '𝛱', '𝛲', '𝛴', '𝛵', '𝛶', '𝛷', '𝛸', '𝛹', '𝛺'
        ];
  /**
   * @type {Array<string>}
   */
  this.smallGreekItalic =
      [
        '𝛼', '𝛽', '𝛾', '𝛿', '𝜀', '𝜁', '𝜂', '𝜃', '𝜄', '𝜅', '𝜆', '𝜇', '𝜈',
       '𝜉', '𝜊', '𝜋', '𝜌', '𝜍', '𝜎', '𝜏', '𝜐', '𝜑', '𝜒', '𝜓', '𝜔'
        ];
  /**
   * @type {Array<string>}
   */
  this.capitalGreekSansSerifBold =
      [
        '𝝖', '𝝗', '𝝘', '𝝙', '𝝚', '𝝛', '𝝜', '𝝝', '𝝞', '𝝟', '𝝠', '𝝡', '𝝢',
       '𝝣', '𝝤', '𝝥', '𝝦', '𝝨', '𝝩', '𝝪', '𝝫', '𝝬', '𝝭', '𝝮'
        ];
  /**
   * @type {Array<string>}
   */
  this.smallGreekSansSerifBold =
      [
        '𝝰', '𝝱', '𝝲', '𝝳', '𝝴', '𝝵', '𝝶', '𝝷', '𝝸', '𝝹', '𝝺', '𝝻', '𝝼',
       '𝝽', '𝝾', '𝝿', '𝞀', '𝞁', '𝞂', '𝞃', '𝞄', '𝞅', '𝞆', '𝞇', '𝞈'
        ];
  /**
   * @type {Array<string>}
   */
  this.greekDoubleStruck =
      [
        'ℼ', 'ℽ', 'ℾ', 'ℿ'
        ];

  // Other alphabets.
  /**
   * @type {Array<string>}
   */
  this.hebrewLetters =
      [
        'ℵ', 'ℶ', 'ℷ', 'ℸ'
        ];

  //Operator symbols
  /**
   * @type {Array<string>}
   */
  this.additions =
      [
        '+', '±', '∓', '∔', '∧', '∨', '∩', '∪', '⊌', '⊓', '⊔', '⊝', '⊞',
        '⊤', '⊥', '⊺', '⊻', '⊼', '⋄', '⋎', '⋏', '⋒', '⋓', '△', '▷', '▽',
        '◁', '⩞', '⊕'
        ];
      /**
       * @type {Array<string>}
           */
  /**
   * Invisible operator for plus.
   * @type {string}
   * @private
   */
  this.invisiblePlus_ = cvox.SemanticUtil.numberToUnicode(0x2064);
  this.additions.push(this.invisiblePlus_);
  /**
   * @type {Array<string>}
   */
  this.multiplications =
      [
        '†', '‡', '∐', '∗', '∘', '∙', '≀', '⊚', '⊛', '⊠', '⊡', '⋅', '⋆', '⋇',
        '⋉', '⋊', '⋋', '⋌', '○'
        ];
  /**
   * Invisible operator for multiplication.
   * @type {string}
   * @private
   */
  this.invisibleTimes_ = cvox.SemanticUtil.numberToUnicode(0x2062);
  this.multiplications.push(this.invisibleTimes_);
  /**
   * @type {Array<string>}
   */
  this.subtractions =
      [
        '-', '⁒', '⁻', '₋', '−', '∖', '∸', '≂', '⊖', '⊟', '➖', '⨩', '⨪',
       '⨫', '⨬', '⨺', '⩁', '⩬', '﹣', '－', '‐', '‑'
        ];
  /**
   * @type {Array<string>}
   */
  this.divisions =
      [
        '/', '÷', '⁄', '∕', '⊘', '⟌', '⦼', '⨸'
        ];
  /**
   * Invisible operator for function application.
   * @type {string}
   * @private
   */
  this.functionApplication_ = cvox.SemanticUtil.numberToUnicode(0x2061);

  //Relation symbols
  /**
   * @type {Array<string>}
   */
  this.equalities =
      [
        '=', '~', '⁼', '₌', '∼', '∽', '≃', '≅', '≈', '≊', '≋', '≌', '≍',
       '≎', '≑', '≒', '≓', '≔', '≕', '≖', '≗', '≘', '≙', '≚', '≛', '≜',
       '≝', '≞', '≟', '≡', '≣', '⧤', '⩦', '⩮', '⩯', '⩰', '⩱', '⩲', '⩳',
       '⩴', '⩵', '⩶', '⩷', '⩸', '⋕', '⩭', '⩪', '⩫', '⩬', '﹦', '＝'
        ];
  /**
   * @type {Array<string>}
   */
  this.inequalities =
      [
        '<', '>', '≁', '≂', '≄', '≆', '≇', '≉', '≏', '≐', '≠', '≢', '≤',
        '≥', '≦', '≧', '≨', '≩', '≪', '≫', '≬', '≭', '≮', '≯', '≰', '≱',
        '≲', '≳', '≴', '≵', '≶', '≷', '≸', '≹', '≺', '≻', '≼', '≽', '≾',
        '≿', '⊀', '⊁', '⋖', '⋗', '⋘', '⋙', '⋚', '⋛', '⋜', '⋝', '⋞', '⋟',
        '⋠', '⋡', '⋢', '⋣', '⋤', '⋥', '⋦', '⋧', '⋨', '⋩', '⩹', '⩺', '⩻',
        '⩼', '⩽', '⩾', '⩿', '⪀', '⪁', '⪂', '⪃', '⪄', '⪅', '⪆', '⪇', '⪈',
        '⪉', '⪊', '⪋', '⪌', '⪍', '⪎', '⪏', '⪐', '⪑', '⪒', '⪓', '⪔', '⪕',
        '⪖', '⪗', '⪘', '⪙', '⪚', '⪛', '⪜', '⪝', '⪞', '⪟', '⪠', '⪡', '⪢',
        '⪣', '⪤', '⪥', '⪦', '⪧', '⪨', '⪩', '⪪', '⪫', '⪬', '⪭', '⪮', '⪯',
        '⪰', '⪱', '⪲', '⪳', '⪴', '⪵', '⪶', '⪷', '⪸', '⪹', '⪺', '⪻', '⪼',
        '⫷', '⫸', '⫹', '⫺', '⧀', '⧁', '﹤', '﹥', '＜', '＞'
      ];
  /**
   * @type {Array<string>}
   */
  this.relations =
      [
            // TODO (sorge): Add all the other relations.
      ];
  /**
   * @type {Array<string>}
   */
  this.arrows =
      [
        '←', '↑', '→', '↓', '↔', '↕', '↖', '↗', '↘', '↙', '↚', '↛', '↜',
        '↝', '↞', '↟', '↠', '↡', '↢', '↣', '↤', '↥', '↦', '↧', '↨', '↩',
        '↪', '↫', '↬', '↭', '↮', '↯', '↰', '↱', '↲', '↳', '↴', '↵', '↶',
        '↷', '↸', '↹', '↺', '↻', '⇄', '⇅', '⇆', '⇇', '⇈', '⇉', '⇊', '⇍',
        '⇎', '⇏', '⇐', '⇑', '⇒', '⇓', '⇔', '⇕', '⇖', '⇗', '⇘', '⇙', '⇚',
        '⇛', '⇜', '⇝', '⇞', '⇟', '⇠', '⇡', '⇢', '⇣', '⇤', '⇥', '⇦', '⇧',
        '⇨', '⇩', '⇪', '⇫', '⇬', '⇭', '⇮', '⇯', '⇰', '⇱', '⇲', '⇳', '⇴',
        '⇵', '⇶', '⇷', '⇸', '⇹', '⇺', '⇻', '⇼', '⇽', '⇾', '⇿', '⌁', '⌃',
        '⌄', '⌤', '⎋', '➔', '➘', '➙', '➚', '➛', '➜', '➝', '➞', '➟', '➠',
        '➡', '➢', '➣', '➤', '➥', '➦', '➧', '➨', '➩', '➪', '➫', '➬', '➭',
        '➮', '➯', '➱', '➲', '➳', '➴', '➵', '➶', '➷', '➸', '➹', '➺', '➻',
        '➼', '➽', '➾', '⟰', '⟱', '⟲', '⟳', '⟴', '⟵', '⟶', '⟷', '⟸', '⟹',
        '⟺', '⟻', '⟼', '⟽', '⟾', '⟿', '⤀', '⤁', '⤂', '⤃', '⤄', '⤅', '⤆',
        '⤇', '⤈', '⤉', '⤊', '⤋', '⤌', '⤍', '⤎', '⤏', '⤐', '⤑', '⤒', '⤓',
        '⤔', '⤕', '⤖', '⤗', '⤘', '⤙', '⤚', '⤛', '⤜', '⤝', '⤞', '⤟', '⤠',
        '⤡', '⤢', '⤣', '⤤', '⤥', '⤦', '⤧', '⤨', '⤩', '⤪', '⤭', '⤮', '⤯',
        '⤰', '⤱', '⤲', '⤳', '⤴', '⤵', '⤶', '⤷', '⤸', '⤹', '⤺', '⤻', '⤼',
        '⤽', '⤾', '⤿', '⥀', '⥁', '⥂', '⥃', '⥄', '⥅', '⥆', '⥇', '⥈', '⥉',
        '⥰', '⥱', '⥲', '⥳', '⥴', '⥵', '⥶', '⥷', '⥸', '⥹', '⥺', '⥻', '⦳',
        '⦴', '⦽', '⧪', '⧬', '⧭', '⨗', '⬀', '⬁', '⬂', '⬃', '⬄', '⬅', '⬆',
        '⬇', '⬈', '⬉', '⬊', '⬋', '⬌', '⬍', '⬎', '⬏', '⬐', '⬑', '⬰', '⬱',
        '⬲', '⬳', '⬴', '⬵', '⬶', '⬷', '⬸', '⬹', '⬺', '⬻', '⬼', '⬽', '⬾',
        '⬿', '⭀', '⭁', '⭂', '⭃', '⭄', '⭅', '⭆', '⭇', '⭈', '⭉', '⭊', '⭋',
        '⭌', '￩', '￪', '￫', '￬',
        // Harpoons
        '↼', '↽', '↾', '↿', '⇀', '⇁', '⇂', '⇃', '⇋', '⇌', '⥊', '⥋', '⥌',
        '⥍', '⥎', '⥏', '⥐', '⥑', '⥒', '⥓', '⥔', '⥕', '⥖', '⥗', '⥘', '⥙',
        '⥚', '⥛', '⥜', '⥝', '⥞', '⥟', '⥠', '⥡', '⥢', '⥣', '⥤', '⥥', '⥦',
        '⥧', '⥨', '⥩', '⥪', '⥫', '⥬', '⥭', '⥮', '⥯', '⥼', '⥽', '⥾', '⥿'
      ];

  //Big operation symbols
  /**
   * @type {Array<string>}
   */
  this.sumOps =
      [
        '⅀', // double struck
        '∏', '∐', '∑', '⋀', '⋁', '⋂', '⋃', '⨀', '⨁', '⨂', '⨃', '⨄', '⨅',
        '⨆', '⨇', '⨈', '⨉', '⨊', '⨋', '⫼', '⫿'
        ];
  /**
   * @type {Array<string>}
   */
  this.intOps =
      [
        '∫', '∬', '∭', '∮', '∯', '∰', '∱', '∲', '∳', '⨌', '⨍', '⨎', '⨏',
        '⨐', '⨑', '⨒', '⨓', '⨔', '⨕', '⨖', '⨗', '⨘', '⨙', '⨚', '⨛', '⨜'
      ];
  /**
   * @type {Array<string>}
   */
  this.prefixOps =
      // TODO (sorge) Insert nabla, differential operators etc.
      [
        '∀', '∃'
      ];
  /**
   * @type {Array<string>}
   */
  this.operatorBits =
      // TODO (sorge) What to do if single glyphs of big ops occur on their own.
      [
        '⌠', '⌡', '⎶', '⎪', '⎮', '⎯', '⎲', '⎳', '⎷'
      ];

  // Accents.
  // TODO (sorge) Add accented characters.

  // Numbers.
  // Digits.
  /**
   * @type {Array<string>}
   */
  this.digitsNormal =
      [
        '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'
        ];
  /**
   * @type {Array<string>}
   */
  this.digitsFullWidth =
      [
        '０', '１', '２', '３', '４', '５', '６', '７', '８', '９'
      ];
  /**
   * @type {Array<string>}
   */
  this.digitsBold =
      [
        '𝟎', '𝟏', '𝟐', '𝟑', '𝟒', '𝟓', '𝟔', '𝟕', '𝟖', '𝟗'
        ];
  /**
   * @type {Array<string>}
   */
  this.digitsDoubleStruck =
      [
        '𝟘', '𝟙', '𝟚', '𝟛', '𝟜', '𝟝', '𝟞', '𝟟', '𝟠', '𝟡'
        ];
  /**
   * @type {Array<string>}
   */
  this.digitsSansSerif =
      [
        '𝟢', '𝟣', '𝟤', '𝟥', '𝟦', '𝟧', '𝟨', '𝟩', '𝟪', '𝟫'
        ];
  /**
   * @type {Array<string>}
   */
  this.digitsSansSerifBold =
      [
        '𝟬', '𝟭', '𝟮', '𝟯', '𝟰', '𝟱', '𝟲', '𝟳', '𝟴', '𝟵'
        ];
  /**
   * @type {Array<string>}
   */
  this.digitsMonospace =
      [
        '𝟶', '𝟷', '𝟸', '𝟹', '𝟺', '𝟻', '𝟼', '𝟽', '𝟾', '𝟿'
        ];
  /**
   * @type {Array<string>}
   */
  this.digitsSuperscript =
      [
        '²', '³', '¹', '⁰', '⁴', '⁵', '⁶', '⁷', '⁸', '⁹'
        ];
  /**
   * @type {Array<string>}
   */
  this.digitsSubscript =
      [
        '₀', '₁', '₂', '₃', '₄', '₅', '₆', '₇', '₈', '₉'
        ];
  /**
   * @type {Array<string>}
   */
  this.fractions =
      [
        '¼', '½', '¾', '⅐', '⅑', '⅒', '⅓', '⅔', '⅕', '⅖', '⅗', '⅘', '⅙',
        '⅚', '⅛', '⅜', '⅝', '⅞', '⅟', '↉'
      ];
  /**
   * @type {Array<string>}
   */
  this.enclosedNumbers =
      // Encircled numbers.
      [
        '①', '②', '③', '④', '⑤', '⑥', '⑦', '⑧', '⑨', '⑩', '⑪', '⑫', '⑬',
        '⑭', '⑮', '⑯', '⑰', '⑱', '⑲', '⑳', '⓪', '⓫', '⓬', '⓭', '⓮', '⓯',
        '⓰', '⓱', '⓲', '⓳', '⓴', '⓵', '⓶', '⓷', '⓸', '⓹', '⓺', '⓻', '⓼',
        '⓽', '⓾', '⓿', '❶', '❷', '❸', '❹', '❺', '❻', '❼', '❽', '❾', '❿',
        '➀', '➁', '➂', '➃', '➄', '➅', '➆', '➇', '➈', '➉', '➊', '➋', '➌',
        '➍', '➎', '➏', '➐', '➑', '➒', '➓', '㉈', '㉉', '㉊', '㉋', '㉌',
        '㉍', '㉎', '㉏', '㉑', '㉒', '㉓', '㉔', '㉕', '㉖', '㉗', '㉘',
        '㉙', '㉚', '㉛', '㉜', '㉝', '㉞', '㉟', '㊱', '㊲', '㊳', '㊴',
        '㊵', '㊶', '㊷', '㊸', '㊹', '㊺', '㊻', '㊼', '㊽', '㊾', '㊿'];
  /**
   * @type {Array<string>}
   */
  this.fencedNumbers =
      // Numbers in Parenthesis.
      [
        '⑴', '⑵', '⑶', '⑷', '⑸', '⑹', '⑺', '⑻', '⑼', '⑽', '⑾', '⑿', '⒀',
        '⒁', '⒂', '⒃', '⒄', '⒅', '⒆', '⒇'
      ];
  /**
   * @type {Array<string>}
   */
  this.punctuatedNumbers =
      // Numbers with other punctuation.
      ['⒈', '⒉', '⒊', '⒋', '⒌', '⒍', '⒎', '⒏', '⒐', '⒑', '⒒', '⒓', '⒔',
       '⒕', '⒖', '⒗', '⒘', '⒙', '⒚', '⒛', // full stop.
       '🄀', '🄁', '🄂', '🄃', '🄄', '🄅', '🄆', '🄇', '🄈', '🄉', '🄊' // comma.
      ];
  /** Array of all single digits.
   * @type {Array<string>}
   */
  this.digits = this.digitsNormal.concat(
      this.digitsFullWidth, this.digitsBold, this.digitsDoubleStruck,
      this.digitsSansSerif, this.digitsSansSerifBold, this.digitsMonospace);
  /** Array of all non-digit number symbols.
   * @type {Array<string>}
   */
  this.numbers = this.fractions.concat(
      this.digitsSuperscript, this.digitsSubscript,
      this.enclosedNumbers, this.fencedNumbers, this.punctuatedNumbers);
  /** Array of all number symbols.
   * @type {Array<string>}
   */
  this.allNumbers = this.digits.concat(this.numbers);

  // Functions.
  /**
   * @type {Array<string>}
   */
  this.trigonometricFunctions =
      [
        'cos', 'cot', 'csc', 'sec', 'sin', 'tan', 'arccos', 'arccot',
        'arccsc', 'arcsec', 'arcsin', 'arctan'
      ];
  /**
   * @type {Array<string>}
   */
  this.hyperbolicFunctions =
      [
        'cosh', 'coth', 'csch', 'sech', 'sinh', 'tanh',
        'arcosh', 'arcoth', 'arcsch', 'arsech', 'arsinh', 'artanh',
        'arccosh', 'arccoth', 'arccsch', 'arcsech', 'arcsinh', 'arctanh'
      ];
  /**
   * @type {Array<string>}
   */
  this.algebraicFunctions =
      [
        'deg', 'det', 'dim', 'hom', 'ker', 'Tr', 'tr'
      ];
  /**
   * @type {Array<string>}
   */
  this.elementaryFunctions =
      [
        'log', 'ln', 'lg', 'exp', 'expt', 'gcd', 'gcd', 'arg', 'im', 're', 'Pr'
      ];
  /** All predefined prefix functions.
   * @type {Array<string>}
   */
  this.prefixFunctions = this.trigonometricFunctions.concat(
      this.hyperbolicFunctions,
      this.algebraicFunctions,
      this.elementaryFunctions
      );
  /** Limit functions are handled separately as they can have lower (and upper)
   * limiting expressions.
   * @type {Array<string>}
   */
  this.limitFunctions =
      [
        'inf', 'lim', 'liminf', 'limsup', 'max', 'min', 'sup', 'injlim',
        'projlim'
      ];
  /**
   * @type {Array<string>}
   */
  this.infixFunctions =
      [
        'mod', 'rem'
      ];
  /**
   * Default assignments of semantic attributes.
   * @type  {Array<{set: Array<string>,
   *         role: cvox.SemanticAttr.Role,
   *         type: cvox.SemanticAttr.Type,
   *         font: cvox.SemanticAttr.Font}>} The semantic meaning of the symbol.
   * @private
   */
  this.symbolSetToSemantic_ = [
    // Punctuation
    {set: this.generalPunctuations,
     type: cvox.SemanticAttr.Type.PUNCTUATION,
     role: cvox.SemanticAttr.Role.UNKNOWN
    },
    {set: this.ellipses,
     type: cvox.SemanticAttr.Type.PUNCTUATION,
     role: cvox.SemanticAttr.Role.ELLIPSIS
    },
    {set: this.fullStops,
     type: cvox.SemanticAttr.Type.PUNCTUATION,
     role: cvox.SemanticAttr.Role.FULLSTOP
    },
    {set: this.dashes,
     type: cvox.SemanticAttr.Type.PUNCTUATION,
     role: cvox.SemanticAttr.Role.DASH
    },
    {set: this.primes,
     type: cvox.SemanticAttr.Type.PUNCTUATION,
     role: cvox.SemanticAttr.Role.PRIME
    },
    // Fences
    {set: this.leftFences,
     type: cvox.SemanticAttr.Type.FENCE,
     role: cvox.SemanticAttr.Role.OPEN
    },
    {set: this.rightFences,
     type: cvox.SemanticAttr.Type.FENCE,
     role: cvox.SemanticAttr.Role.CLOSE
    },
    {set: this.topFences,
     type: cvox.SemanticAttr.Type.FENCE,
     role: cvox.SemanticAttr.Role.TOP
    },
    {set: this.bottomFences,
     type: cvox.SemanticAttr.Type.FENCE,
     role: cvox.SemanticAttr.Role.BOTTOM
    },
    {set: this.neutralFences,
     type: cvox.SemanticAttr.Type.FENCE,
     role: cvox.SemanticAttr.Role.NEUTRAL
    },
    // Single characters.
    // Latin alphabets.
    {set: this.smallLatin,
     type: cvox.SemanticAttr.Type.IDENTIFIER,
     role: cvox.SemanticAttr.Role.LATINLETTER,
     font: cvox.SemanticAttr.Font.NORMAL
    },
    {set: this.capitalLatin,
     type: cvox.SemanticAttr.Type.IDENTIFIER,
     role: cvox.SemanticAttr.Role.LATINLETTER,
     font: cvox.SemanticAttr.Font.NORMAL
    },
    {set: this.smallLatinFullWidth,
     type: cvox.SemanticAttr.Type.IDENTIFIER,
     role: cvox.SemanticAttr.Role.LATINLETTER,
     font: cvox.SemanticAttr.Font.NORMAL
    },
    {set: this.capitalLatinFullWidth,
     type: cvox.SemanticAttr.Type.IDENTIFIER,
     role: cvox.SemanticAttr.Role.LATINLETTER,
     font: cvox.SemanticAttr.Font.NORMAL
    },
    {set: this.smallLatinBold,
     type: cvox.SemanticAttr.Type.IDENTIFIER,
     role: cvox.SemanticAttr.Role.LATINLETTER,
     font: cvox.SemanticAttr.Font.BOLD
    },
    {set: this.capitalLatinBold,
     type: cvox.SemanticAttr.Type.IDENTIFIER,
     role: cvox.SemanticAttr.Role.LATINLETTER,
     font: cvox.SemanticAttr.Font.BOLD
    },
    {set: this.smallLatinItalic,
     type: cvox.SemanticAttr.Type.IDENTIFIER,
     role: cvox.SemanticAttr.Role.LATINLETTER,
     font: cvox.SemanticAttr.Font.ITALIC
    },
    {set: this.capitalLatinItalic,
     type: cvox.SemanticAttr.Type.IDENTIFIER,
     role: cvox.SemanticAttr.Role.LATINLETTER,
     font: cvox.SemanticAttr.Font.ITALIC
    },
    {set: this.smallLatinScript,
     type: cvox.SemanticAttr.Type.IDENTIFIER,
     role: cvox.SemanticAttr.Role.LATINLETTER,
     font: cvox.SemanticAttr.Font.SCRIPT
    },
    {set: this.capitalLatinScript,
     type: cvox.SemanticAttr.Type.IDENTIFIER,
     role: cvox.SemanticAttr.Role.LATINLETTER,
     font: cvox.SemanticAttr.Font.SCRIPT
    },
    {set: this.smallLatinBoldScript,
     type: cvox.SemanticAttr.Type.IDENTIFIER,
     role: cvox.SemanticAttr.Role.LATINLETTER,
     font: cvox.SemanticAttr.Font.BOLDSCRIPT
    },
    {set: this.capitalLatinBoldScript,
     type: cvox.SemanticAttr.Type.IDENTIFIER,
     role: cvox.SemanticAttr.Role.LATINLETTER,
     font: cvox.SemanticAttr.Font.BOLDSCRIPT
    },
    {set: this.smallLatinFraktur,
     type: cvox.SemanticAttr.Type.IDENTIFIER,
     role: cvox.SemanticAttr.Role.LATINLETTER,
     font: cvox.SemanticAttr.Font.FRAKTUR
    },
    {set: this.capitalLatinFraktur,
     type: cvox.SemanticAttr.Type.IDENTIFIER,
     role: cvox.SemanticAttr.Role.LATINLETTER,
     font: cvox.SemanticAttr.Font.FRAKTUR
    },
    {set: this.smallLatinDoubleStruck,
     type: cvox.SemanticAttr.Type.IDENTIFIER,
     role: cvox.SemanticAttr.Role.LATINLETTER,
     font: cvox.SemanticAttr.Font.DOUBLESTRUCK
    },
    {set: this.capitalLatinDoubleStruck,
     type: cvox.SemanticAttr.Type.IDENTIFIER,
     role: cvox.SemanticAttr.Role.LATINLETTER,
     font: cvox.SemanticAttr.Font.DOUBLESTRUCK
    },
    {set: this.smallLatinBoldFraktur,
     type: cvox.SemanticAttr.Type.IDENTIFIER,
     role: cvox.SemanticAttr.Role.LATINLETTER,
     font: cvox.SemanticAttr.Font.BOLDFRAKTUR
    },
    {set: this.capitalLatinBoldFraktur,
     type: cvox.SemanticAttr.Type.IDENTIFIER,
     role: cvox.SemanticAttr.Role.LATINLETTER,
     font: cvox.SemanticAttr.Font.BOLDFRAKTUR
    },
    {set: this.smallLatinSansSerif,
     type: cvox.SemanticAttr.Type.IDENTIFIER,
     role: cvox.SemanticAttr.Role.LATINLETTER,
     font: cvox.SemanticAttr.Font.SANSSERIF
    },
    {set: this.capitalLatinSansSerif,
     type: cvox.SemanticAttr.Type.IDENTIFIER,
     role: cvox.SemanticAttr.Role.LATINLETTER,
     font: cvox.SemanticAttr.Font.SANSSERIF
    },
    {set: this.smallLatinSansSerifBold,
     type: cvox.SemanticAttr.Type.IDENTIFIER,
     role: cvox.SemanticAttr.Role.LATINLETTER,
     font: cvox.SemanticAttr.Font.SANSSERIFBOLD
    },
    {set: this.capitalLatinSansSerifBold,
     type: cvox.SemanticAttr.Type.IDENTIFIER,
     role: cvox.SemanticAttr.Role.LATINLETTER,
     font: cvox.SemanticAttr.Font.SANSSERIFBOLD
    },
    {set: this.smallLatinSansSerifItalic,
     type: cvox.SemanticAttr.Type.IDENTIFIER,
     role: cvox.SemanticAttr.Role.LATINLETTER,
     font: cvox.SemanticAttr.Font.SANSSERIFITALIC
    },
    {set: this.capitalLatinSansSerifItalic,
     type: cvox.SemanticAttr.Type.IDENTIFIER,
     role: cvox.SemanticAttr.Role.LATINLETTER,
     font: cvox.SemanticAttr.Font.SANSSERIFITALIC
    },
    {set: this.smallLatinMonospace,
     type: cvox.SemanticAttr.Type.IDENTIFIER,
     role: cvox.SemanticAttr.Role.LATINLETTER,
     font: cvox.SemanticAttr.Font.MONOSPACE
    },
    {set: this.capitalLatinMonospace,
     type: cvox.SemanticAttr.Type.IDENTIFIER,
     role: cvox.SemanticAttr.Role.LATINLETTER,
     font: cvox.SemanticAttr.Font.MONOSPACE
    },
    {set: this.latinDoubleStruckItalic,
     type: cvox.SemanticAttr.Type.IDENTIFIER,
     role: cvox.SemanticAttr.Role.LATINLETTER,
     font: cvox.SemanticAttr.Font.DOUBLESTRUCKITALIC
    },
    // Greek alphabets.
    {set: this.smallGreek,
     type: cvox.SemanticAttr.Type.IDENTIFIER,
     role: cvox.SemanticAttr.Role.GREEKLETTER,
     font: cvox.SemanticAttr.Font.NORMAL
    },
    {set: this.capitalGreek,
     type: cvox.SemanticAttr.Type.IDENTIFIER,
     role: cvox.SemanticAttr.Role.GREEKLETTER,
     font: cvox.SemanticAttr.Font.NORMAL
    },
    {set: this.smallGreekBold,
     type: cvox.SemanticAttr.Type.IDENTIFIER,
     role: cvox.SemanticAttr.Role.GREEKLETTER,
     font: cvox.SemanticAttr.Font.BOLD
    },
    {set: this.capitalGreekBold,
     type: cvox.SemanticAttr.Type.IDENTIFIER,
     role: cvox.SemanticAttr.Role.GREEKLETTER,
     font: cvox.SemanticAttr.Font.BOLD
    },
    {set: this.smallGreekItalic,
     type: cvox.SemanticAttr.Type.IDENTIFIER,
     role: cvox.SemanticAttr.Role.GREEKLETTER,
     font: cvox.SemanticAttr.Font.ITALIC
    },
    {set: this.capitalGreekItalic,
     type: cvox.SemanticAttr.Type.IDENTIFIER,
     role: cvox.SemanticAttr.Role.GREEKLETTER,
     font: cvox.SemanticAttr.Font.ITALIC
    },
    {set: this.smallGreekSansSerifBold,
     type: cvox.SemanticAttr.Type.IDENTIFIER,
     role: cvox.SemanticAttr.Role.GREEKLETTER,
     font: cvox.SemanticAttr.Font.SANSSERIFBOLD
    },
    {set: this.capitalGreekSansSerifBold,
     type: cvox.SemanticAttr.Type.IDENTIFIER,
     role: cvox.SemanticAttr.Role.GREEKLETTER,
     font: cvox.SemanticAttr.Font.SANSSERIFBOLD
    },
    {set: this.greekDoubleStruck,
     type: cvox.SemanticAttr.Type.IDENTIFIER,
     role: cvox.SemanticAttr.Role.GREEKLETTER,
     font: cvox.SemanticAttr.Font.DOUBLESTRUCK
    },
    // Other alphabets.
    {set: this.hebrewLetters,
     type: cvox.SemanticAttr.Type.IDENTIFIER,
     role: cvox.SemanticAttr.Role.OTHERLETTER,
     font: cvox.SemanticAttr.Font.NORMAL
    },
    // Numbers.
    {set: this.digitsNormal,
     type: cvox.SemanticAttr.Type.NUMBER,
     role: cvox.SemanticAttr.Role.INTEGER,
     font: cvox.SemanticAttr.Font.NORMAL
    },
    {set: this.digitsFullWidth,
     type: cvox.SemanticAttr.Type.NUMBER,
     role: cvox.SemanticAttr.Role.INTEGER,
     font: cvox.SemanticAttr.Font.NORMAL
    },
    {set: this.digitsBold,
     type: cvox.SemanticAttr.Type.NUMBER,
     role: cvox.SemanticAttr.Role.INTEGER,
     font: cvox.SemanticAttr.Font.BOLD
    },
    {set: this.digitsDoubleStruck,
     type: cvox.SemanticAttr.Type.NUMBER,
     role: cvox.SemanticAttr.Role.INTEGER,
     font: cvox.SemanticAttr.Font.DOUBLESTRUCK
    },
    {set: this.digitsSansSerif,
     type: cvox.SemanticAttr.Type.NUMBER,
     role: cvox.SemanticAttr.Role.INTEGER,
     font: cvox.SemanticAttr.Font.SANSSERIF
    },
    {set: this.digitsSansSerifBold,
     type: cvox.SemanticAttr.Type.NUMBER,
     role: cvox.SemanticAttr.Role.INTEGER,
     font: cvox.SemanticAttr.Font.SANSSERIFBOLD
    },
    {set: this.digitsMonospace,
     type: cvox.SemanticAttr.Type.NUMBER,
     role: cvox.SemanticAttr.Role.INTEGER,
     font: cvox.SemanticAttr.Font.MONOSPACE
    },
   {set: this.numbers,
     type: cvox.SemanticAttr.Type.NUMBER,
     role: cvox.SemanticAttr.Role.INTEGER
    },
    // Operators.
    {set: this.additions,
     type: cvox.SemanticAttr.Type.OPERATOR,
     role: cvox.SemanticAttr.Role.ADDITION
    },
    {set: this.multiplications,
     type: cvox.SemanticAttr.Type.OPERATOR,
     role: cvox.SemanticAttr.Role.MULTIPLICATION
    },
    {set: this.subtractions,
     type: cvox.SemanticAttr.Type.OPERATOR,
     role: cvox.SemanticAttr.Role.SUBTRACTION
    },
    {set: this.divisions,
     type: cvox.SemanticAttr.Type.OPERATOR,
     role: cvox.SemanticAttr.Role.DIVISION
    },
    {set: this.prefixOps,
     type: cvox.SemanticAttr.Type.PREFIXOP,
     role: cvox.SemanticAttr.Role.PREFIXFUNC
    },
    // Relations
    {set: this.equalities,
     type: cvox.SemanticAttr.Type.RELATION,
     role: cvox.SemanticAttr.Role.EQUALITY
    },
    {set: this.inequalities,
     type: cvox.SemanticAttr.Type.RELATION,
     role: cvox.SemanticAttr.Role.INEQUALITY
    },
    {set: this.relations,
     type: cvox.SemanticAttr.Type.RELATION,
     role: cvox.SemanticAttr.Role.UNKNOWN
    },
    {set: this.arrows,
     type: cvox.SemanticAttr.Type.RELATION,
     role: cvox.SemanticAttr.Role.ARROW
    },
    // Large operators
    {set: this.sumOps,
     type: cvox.SemanticAttr.Type.LARGEOP,
     role: cvox.SemanticAttr.Role.SUM},
    {set: this.intOps,
     type: cvox.SemanticAttr.Type.LARGEOP,
     role: cvox.SemanticAttr.Role.INTEGRAL},
    // Functions
    {set: this.limitFunctions,
     type: cvox.SemanticAttr.Type.FUNCTION,
     role: cvox.SemanticAttr.Role.LIMFUNC},
    {set: this.prefixFunctions,
     type: cvox.SemanticAttr.Type.FUNCTION,
     role: cvox.SemanticAttr.Role.PREFIXFUNC},
    {set: this.infixFunctions,
     type: cvox.SemanticAttr.Type.OPERATOR,
     role: cvox.SemanticAttr.Role.MULTIPLICATION
    }
    // TODO (sorge) Add some of the remaining elements.
  ];
};
goog.addSingletonGetter(cvox.SemanticAttr);


/**
 * Union type of semantic attributes.
 * @typedef {cvox.SemanticAttr.Type|cvox.SemanticAttr.Role}
 */
cvox.SemanticAttr.Attr;


/**
 * Mapping for types of elements.
 * @enum {string}
 */
cvox.SemanticAttr.Type = {
  // Leafs.
  // Punctuation like comma, dot, ellipses.
  PUNCTUATION: 'punctuation',
  // Fence symbol.
  FENCE: 'fence',
  // One or several digits, plus some punctuation.
  NUMBER: 'number',
  // Single or multiple letters.
  IDENTIFIER: 'identifier',
  // Regular text in a math expression.
  TEXT: 'text',
  // e.g. +, *.
  OPERATOR: 'operator',
  // Relation symbol, e.g. equals.
  RELATION: 'relation',
  // e.g. Sum, product, integral.
  LARGEOP: 'largeop',
  // Some named function.
  FUNCTION: 'function',

  // Branches.
  // Compound Symbols.
  ACCENT: 'accent',
  FENCED: 'fenced',
  FRACTION: 'fraction',
  PUNCTUATED: 'punctuated',

  // Relations.
  // Relation sequence of a single relation.
  RELSEQ: 'relseq',
  // Relation sequence containing at least two different relations.
  MULTIREL: 'multirel',
  // Operations.
  INFIXOP: 'infixop',
  PREFIXOP: 'prefixop',
  POSTFIXOP: 'postfixop',

  // Function and Bigop Application.
  APPL: 'appl',
  INTEGRAL: 'integral',
  BIGOP: 'bigop',

  SQRT: 'sqrt',
  ROOT: 'root',
  // These are bigops or functions with limits.
  LIMUPPER: 'limupper',
  LIMLOWER: 'limlower',
  LIMBOTH: 'limboth',
  SUBSCRIPT: 'subscript',
  SUPERSCRIPT: 'superscript',
  UNDERSCORE: 'underscore',
  OVERSCORE: 'overscore',

  // Tables and their elements.
  TABLE: 'table',
  MULTILINE: 'multiline',
  MATRIX: 'matrix',
  VECTOR: 'vector',
  CASES: 'cases',
  ROW: 'row',
  // Lines are effectively single cell rows.
  LINE: 'line',
  CELL: 'cell',

  // General.
  UNKNOWN: 'unknown',
  EMPTY: 'empty'
};


/**
 * Mapping for roles of nodes.
 * Roles are more specific than types.
 * @enum {string}
 */
cvox.SemanticAttr.Role = {
  // Punctuation.
  ELLIPSIS: 'ellipsis',
  FULLSTOP: 'fullstop',
  DASH: 'dash',
  PRIME: 'prime',   // Superscript.
  VBAR: 'vbar',  // A vertical bar.
  OPENFENCE: 'openfence',
  CLOSEFENCE: 'closefence',
  APPLICATION: 'application', // Function Application.

  // Fences.
  OPEN: 'open',
  CLOSE: 'close',
  TOP: 'top',
  BOTTOM: 'bottom',
  NEUTRAL: 'neutral',

  // Letters.
  LATINLETTER: 'latinletter',
  GREEKLETTER: 'greekletter',
  OTHERLETTER: 'otherletter',

  // Numbers.
  INTEGER: 'integer',
  FLOAT: 'float',
  OTHERNUMBER: 'othernumber',

  // Accents.
  MULTIACCENT: 'multiaccent',
  OVERACCENT: 'overaccent',
  UNDERACCENT: 'underaccent',

  // Fenced.
  LEFTRIGHT: 'leftright',
  ABOVEBELOW: 'abovebelow',

  // Punctuated elements.
  SEQUENCE: 'sequence',
  ENDPUNCT: 'endpunct',
  STARTPUNCT: 'startpunct',

  // Operators.
  NEGATIVE: 'negative',
  NEGATION: 'negation',
  MULTIOP: 'multiop',

  // Functions.
  LIMFUNC: 'limit function',
  INFIXFUNC: 'infix function',
  PREFIXFUNC: 'prefix function',
  POSTFIXFUNC: 'postfix function',

  // Large operators.
  SUM: 'sum',
  INTEGRAL: 'integral',

  // Binary operations.
  ADDITION: 'addition',
  MULTIPLICATION: 'multiplication',
  DIVISION: 'division',
  SUBTRACTION: 'subtraction',
  IMPLICIT: 'implicit',

  // Relations.
  EQUALITY: 'equality',
  INEQUALITY: 'inequality',
  ELEMENT: 'element',
  BINREL: 'binrel',
  ARROW: 'arrow',

  // Roles of rows, lines, cells.
  // They mirror the different types for tables.
  MULTILINE: 'multiline',
  MATRIX: 'matrix',
  VECTOR: 'vector',
  CASES: 'cases',
  TABLE: 'table',

  // General
  UNKNOWN: 'unknown'
};


/**
 * Mapping for font annotations. (Taken from MathML2 section 3.2.2, with the
 * exception of double-struck-italic.)
 * @enum {string}
 */
cvox.SemanticAttr.Font = {
  BOLD: 'bold',
  BOLDFRAKTUR: 'bold-fraktur',
  BOLDITALIC: 'bold-italic',
  BOLDSCRIPT: 'bold-script',
  DOUBLESTRUCK: 'double-struck',
  DOUBLESTRUCKITALIC: 'double-struck-italic',
  FRAKTUR: 'fraktur',
  ITALIC: 'italic',
  MONOSPACE: 'monospace',
  NORMAL: 'normal',
  SCRIPT: 'script',
  SANSSERIF: 'sans-serif',
  SANSSERIFITALIC: 'sans-serif-italic',
  SANSSERIFBOLD: 'sans-serif-bold',
  SANSSERIFBOLDITALIC: 'sans-serif-bold-italic',
  UNKNOWN: 'unknown'
};


/**
 * Lookup the semantic type of a symbol.
 * @param {string} symbol The symbol to which we want to determine the type.
 * @return {cvox.SemanticAttr.Type} The semantic type of the symbol.
 */
cvox.SemanticAttr.prototype.lookupType = function(symbol) {
  return cvox.SemanticAttr.Type.UNKNOWN;
};


/**
 * Lookup the semantic role of a symbol.
 * @param {string} symbol The symbol to which we want to determine the role.
 * @return {cvox.SemanticAttr.Role} The semantic role of the symbol.
 */
cvox.SemanticAttr.prototype.lookupRole = function(symbol) {
  return cvox.SemanticAttr.Role.UNKNOWN;
};


/**
 * Lookup the semantic meaning of a symbol in terms of type and role.
 * @param {string} symbol The symbol to which we want to determine the meaning.
 * @return {{role: cvox.SemanticAttr.Role,
 *           type: cvox.SemanticAttr.Type}} The semantic meaning of the symbol.
 */
cvox.SemanticAttr.lookupMeaning = function(symbol) {
  return cvox.SemanticAttr.getInstance().lookupMeaning_(symbol);
};


/**
 * String representation of the invisible times unicode character.
 * @return {string} The invisible times character.
 */
cvox.SemanticAttr.invisibleTimes = function() {
  return cvox.SemanticAttr.getInstance().invisibleTimes_;
};


/**
 * String representation of the invisible comma unicode character.
 * @return {string} The invisible comma character.
 */
cvox.SemanticAttr.invisibleComma = function() {
  return cvox.SemanticAttr.getInstance().invisibleComma_;
};


/**
 * String representation of the function application character.
 * @return {string} The invisible function application character.
 */
cvox.SemanticAttr.functionApplication = function() {
  return cvox.SemanticAttr.getInstance().functionApplication_;
};


/**
 * Decide when two fences match. Currently we match any right to left
 * or bottom to top fence and neutral to neutral.
 * @param {cvox.SemanticAttr.Role} open Opening fence.
 * @param {cvox.SemanticAttr.Role} close Closing fence.
 * @return {boolean} True if the fences are matching.
 */
cvox.SemanticAttr.isMatchingFenceRole = function(open, close) {
  return (open == cvox.SemanticAttr.Role.OPEN &&
      close == cvox.SemanticAttr.Role.CLOSE) ||
          (open == cvox.SemanticAttr.Role.NEUTRAL &&
              close == cvox.SemanticAttr.Role.NEUTRAL) ||
                  (open == cvox.SemanticAttr.Role.TOP &&
                      close == cvox.SemanticAttr.Role.BOTTOM);
};


/**
 * Decide when opening and closing fences match. For neutral fences they have to
 * be the same.
 * @param {string} open Opening fence.
 * @param {string} close Closing fence.
 * @return {boolean} True if the fences are matching.
 */
cvox.SemanticAttr.isMatchingFence = function(open, close) {
  return cvox.SemanticAttr.getInstance().isMatchingFence_(open, close);
};


/**
 * Determines if a fence is an opening fence.
 * @param {cvox.SemanticAttr.Role} fence Opening fence.
 * @return {boolean} True if the fence is open or neutral.
 */
cvox.SemanticAttr.isOpeningFence = function(fence) {
  return (fence == cvox.SemanticAttr.Role.OPEN ||
          fence == cvox.SemanticAttr.Role.NEUTRAL);
};


/**
 * Determines if a fence is a closing fence.
 * @param {cvox.SemanticAttr.Role} fence Closing fence.
 * @return {boolean} True if the fence is close or neutral.
 */
cvox.SemanticAttr.isClosingFence = function(fence) {
  return (fence == cvox.SemanticAttr.Role.CLOSE ||
          fence == cvox.SemanticAttr.Role.NEUTRAL);
};


// TODO (sorge) Make this depended on position in the alphabets.
/**
 * Check if a character is a small 'd' in some font.
 * @param {!string} chr The character string.
 * @return {boolean} True if the character is indeed a single small d.
 */
cvox.SemanticAttr.isCharacterD = function(chr) {
  var Ds = ['d', 'ⅆ', 'ｄ', '𝐝', '𝑑', '𝒹', '𝓭', '𝔡',
            '𝕕', '𝖉', '𝖽', '𝗱', '𝘥', '𝚍'];
  return Ds.indexOf(chr) != -1;
};


/**
 * Decide when opening and closing fences match. For neutral fences they have to
 * be the same.
 * @param {!string} open Opening fence.
 * @param {!string} close Closing fence.
 * @return {boolean} True if the fences are matching.
 * @private
 */
cvox.SemanticAttr.prototype.isMatchingFence_ = function(open, close) {
  if (this.neutralFences.indexOf(open) != -1) {
    return open == close;
  }
  return this.openClosePairs[open] == close ||
      this.topBottomPairs[open] == close;
};


/**
 * Lookup the semantic meaning of a symbol in terms of type and role.
 * @param {!string} symbol The symbol to which we want to determine the meaning.
 * @return {{role: cvox.SemanticAttr.Role,
 *           type: cvox.SemanticAttr.Type,
 *           font: cvox.SemanticAttr.Font}} The semantic meaning of the symbol.
 * @private
 */
cvox.SemanticAttr.prototype.lookupMeaning_ = function(symbol) {
  for (var i = 0, set; set = this.symbolSetToSemantic_[i]; i++) {
    if (set.set.indexOf(symbol) != -1) {
      return {role: set.role || cvox.SemanticAttr.Role.UNKNOWN,
              type: set.type || cvox.SemanticAttr.Type.UNKNOWN,
              font: set.font || cvox.SemanticAttr.Font.UNKNOWN
             };
    }
  }
  return {role: cvox.SemanticAttr.Role.UNKNOWN,
          type: cvox.SemanticAttr.Type.UNKNOWN,
          font: cvox.SemanticAttr.Font.UNKNOWN
         };
};
