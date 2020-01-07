import Component from '@ember/component';
import layout from '../templates/components/tag-sidebar';
import { inject as service } from '@ember/service';
import { computed } from '@ember/object';
import { filter } from '@ember/object/computed';

export default Component.extend({
  router: service(),

  fiteredTags: filter('tags.[]', ['yearTags'], function (tag) {
    let individualIgnoredTags = [
      'releases',
      'new',
    ];

    let allIgnoredTags = [
      ...individualIgnoredTags,
      ...this.yearTags.map(tag => tag.id),
      ...this.versionTags.map(tag => tag.id),
    ]

    return !allIgnoredTags.includes(tag.id);
  }),

  yearTags: filter('tags.[]', function (tag) {
    // console.log(tag.id, tag.id.match(/^20\d\d$/))
    return tag.id.match(/^20\d\d$/);
  }),

  specificVersionTags: filter('tags.[]', function (tag) {
    return tag.id.match(/^3.\d$/) || tag.id.match(/^2.\d$/) || tag.id.match(/^1.\d$/)
  }),

  newsletterTags: filter('tags.[]', function (tag) {
    if (tag.id.match(/^newsletter/)) {
      return tag;
    }
  }),

  versionTags: filter('tags.[]', function (tag) {
    let versionTags = [
      "3",
      "2",
      "1",
      "version-1-x",
      "version-2-x",
      "version-3-x"
    ]

    let allIgnoredTags = [
      ...versionTags,
      ... this.specificVersionTags.map(tag => tag.id)
    ]

    return allIgnoredTags.includes(tag.id);
  }),

  showSidebar: computed('router.currentRouteName', function () {
    if (this.router.currentRouteName === 'author') {

      return false;
    }
    return true;
  }),

  layout
});
