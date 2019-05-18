const NAME = "<%= FEATURE %>";
<% ACTIONS.forEach (function(ACTION) { %>
const <%= ACTION %> = {
  START: `${NAME}/<%= ACTION %>/START`,
  SUCCEED: `${NAME}/<%= ACTION %>/SUCCEED`,
  FAIL: `${NAME}/<%= ACTION %>/FAIL`,
}
<% }); %>
export {
<% ACTIONS.forEach (function(ACTION) { %>
  start<%= ACTION %>,
  succeed<%= ACTION %>,
  fail<%= ACTION %>,
<% }); %>
}