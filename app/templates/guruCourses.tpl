<img class="bg" src="/images/bg.jpg" alt=""/>
<div class="site-wrapper-inner">
  <div class="cover-container">
    <div class="masthead clearfix">
      <div class="inner">
        <h3 class="masthead-brand">Guitar With Guru</h3>
        <ul class="nav masthead-nav">
          <li><a href="#">Home</a></li>
          <li class="active"><a href="#">Gurus</a></li>
        </ul>
      </div>
    </div>

    <div class="inner cover">
      <h3 class="">Create courses.</h3>
      <p>These courses will be shown in search results.</p>

      <div id="courseCreator" class="text-left">
        <form class="form-inline clearfix mb-30" role="form">
          <div class="checkbox">
            <label>
              <input type="checkbox" checked="checked" id=""/> Single Classes
            </label>
          </div>
          <div class="form-group pull-right">
            <label>Fee (Rs.)</label>
            <input type="text" class="form-control" placeholder="800" style="width: 100px;"/>
            <label>/class</label>
          </div>
        </form>

        <form class="form-horizontal" role="form">
          <div class="form-group">
            <label class="control-label col-sm-3" for="">Course Name</label>
            <div class="col-sm-7">
              <input type="text" class="form-control" placeholder="Carnatic Guitar Techniques"/>
            </div>
          </div>
          <div class="form-group">
            <label class="control-label col-sm-3" for="">Course Description</label>
            <div class="col-sm-7">
              <textarea name="" rows="5"
                        placeholder="A capable guitarist wanting to learn left and right hand techniques, traids, vibrato, bending, picking techniques, how to arpeggiate chords etc"
                        class="form-control"></textarea>
            </div>
          </div>
          <div class="form-group">
            <label class="control-label col-sm-3" for="">Target Audience</label>
            <div class="col-sm-7">
              <label class="checkbox-inline" for="beginner">
                <input type="checkbox" id="beginner" value="beginner"/> Beginner
              </label>
              <label class="checkbox-inline" for="intermediate">
                <input type="checkbox" id="intermediate" value="intermediate"/> Intermediate
              </label>
              <label class="checkbox-inline" for="advanced">
                <input type="checkbox" id="advanced" value="advanced"/> Advanced
              </label>
            </div>
          </div>
          <div class="form-group">
            <label class="control-label col-sm-3" for="">Course Duration</label>
            <div class="col-sm-3">
              <div class="input-group">
                <input type="text" class="form-control">
                <span class="input-group-addon">hours</span>
              </div>
            </div>
          </div>
          <div class="form-group">
            <label class="control-label col-sm-3" for="">Course Fee</label>
            <div class="col-sm-3">
              <div class="input-group">
                <span class="input-group-addon">Rs.</span>
                <input type="text" class="form-control">
              </div>
            </div>
          </div>
        </form>
      </div>

      <div class="clearfix">
        <button class="btn btn-success pull-right" id="saveSchedule">Save and Proceed</button>
      </div>
    </div>

    <!--    <div class="mastfoot">
          <div class="inner">
            <p>&copy; 2014 | Guitar With Guru</p>
      </div>
    </div>-->
  </div>
</div>