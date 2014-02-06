<nav class="navbar navbar-static-top navbar-inverse" role="navigation">
  <div class="container">
    <!-- Brand and toggle get grouped for better mobile display -->
    <div class="navbar-header">
      <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#gwg-navbar">
        <span class="sr-only">Toggle navigation</span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
      </button>
      <a class="navbar-brand" href="/">Guitar With Guru</a>
    </div>

    <!-- Collect the nav links, forms, and other content for toggling -->
    <div class="collapse navbar-collapse" id="gwg-navbar">
      <ul class="nav navbar-nav navbar-right">
        <li class="dropdown">
          <a href="#" class="dropdown-toggle" data-toggle="dropdown">Aakash Goel <b class="caret"></b></a>
          <ul class="dropdown-menu">
            <li><a href="#">Logout</a></li>
          </ul>
        </li>
      </ul>
    </div><!-- /.navbar-collapse -->
  </div><!-- /.container-fluid -->
</nav>

<div class="container">
  <div class="row">
    <div class="col-md-3">
      <div style="margin-bottom: 20px;"></div>
      <ul class="nav nav-pills nav-stacked">
        <li class="active"><a href="/g/1">Schedule</a></li>
        <li><a href="/g/2">Course</a></li>
      </ul>
    </div>
    <div class="col-md-8 col-md-offset-1">
      <h3>Create time slots.</h3>
      <p>People will make reservations against these timings.</p>

      <div id="scheduleCreator">

      </div>

      <div class="clearfix mb-30">
        <button class="btn btn-success pull-right" id="saveSchedule">Save and Proceed</button>
      </div>
    </div>
  </div>
</div>