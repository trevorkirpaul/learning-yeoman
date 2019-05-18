import { <%= FEATURE %> } from '@redux/constants';
<% ACTIONS.forEach (function(ACTION) { %>
/**
 * **start<%= ACTION %>** is an action creator which
 * signifies when the <%= ACTION %> has started
 */
const start<%= ACTION %> = ({ payload }) => ({
  type: <%= ACTION %>.START,
  payload
});

/**
 * **succeed<%= ACTION %>** is an action creator which
 * signifies when <%= ACTION %> has succeeded
 */
const succeed<%= ACTION %> = ({ payload }) => ({
  type: <%= ACTION %>.START,
  payload
});

/**
 * **fail<%= ACTION %>** is an action creator which
 * signifies when <%= ACTION %> has failed
 */
const fail<%= ACTION %> = ({ payload }) => ({
  type: <%= ACTION %>.START,
  payload
});
<% }); %>
export {
<% ACTIONS.forEach (function(ACTION) { %>
  start<%= ACTION %>,
  succeed<%= ACTION %>,
  fail<%= ACTION %>,
<% }); %>
}